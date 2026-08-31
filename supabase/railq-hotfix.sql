-- RailQ hotfix: run once in Supabase SQL Editor BEFORE deploying the code.
-- Safe to run again. Does not delete or modify existing leads, analytics or reminders.
begin;
create table if not exists public.rail_api_counters (
  counter_key text not null,
  bucket text not null,
  used bigint not null default 0,
  expires_at timestamptz not null,
  primary key (counter_key, bucket)
);
create index if not exists rail_api_counters_expiry on public.rail_api_counters(expires_at);
alter table public.rail_api_counters enable row level security;
revoke all on public.rail_api_counters from public, anon, authenticated;
grant select, insert, update, delete on public.rail_api_counters to service_role;

create table if not exists public.rail_api_cache (
  cache_key text primary key,
  payload jsonb not null,
  fetched_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index if not exists rail_api_cache_expiry on public.rail_api_cache(expires_at);
alter table public.rail_api_cache enable row level security;
revoke all on public.rail_api_cache from public, anon, authenticated;
grant select, insert, update, delete on public.rail_api_cache to service_role;
grant usage on schema public to service_role;

create or replace function public.rail_api_take(p_key text, p_limit integer, p_window integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_now timestamptz := clock_timestamp();
  v_start timestamptz;
  v_expiry timestamptz;
  v_used bigint;
begin
  if p_key is null or length(p_key) > 160 or p_limit is null or p_window is null or p_limit not between 1 and 1000 or p_window not between 1 and 86400 then raise exception 'Invalid rate policy'; end if;
  v_start := to_timestamp(floor(extract(epoch from v_now) / p_window) * p_window);
  v_expiry := v_start + make_interval(secs => p_window);
  insert into public.rail_api_counters as c(counter_key,bucket,used,expires_at)
  values(p_key, v_start::text, 1, v_expiry)
  on conflict(counter_key,bucket) do update set used = c.used + 1
    where c.used < p_limit
  returning used into v_used;
  -- Bounded cleanup, unrelated to the live counter.
  delete from public.rail_api_counters where (counter_key,bucket) in
    (select counter_key,bucket from public.rail_api_counters where expires_at < v_now limit 50);
  delete from public.rail_api_cache where cache_key in
    (select cache_key from public.rail_api_cache where expires_at < v_now - interval '1 day' limit 20);
  return jsonb_build_object('allowed',v_used is not null,'remaining',greatest(0,p_limit-coalesce(v_used,p_limit)), 'retry_after', greatest(1,ceil(extract(epoch from v_expiry-v_now))::integer));
end $$;

create or replace function public.rail_api_reserve(p_limit integer, p_burst integer, p_reset_day integer default 1)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_now timestamptz := clock_timestamp();
  v_start timestamptz;
  v_end timestamptz;
  v_minute timestamptz := date_trunc('minute',v_now);
  v_month_used bigint;
  v_burst_used bigint;
begin
  if p_limit is null or p_burst is null or p_reset_day is null or p_limit not between 1 and 10000000 or p_burst not between 1 and 10000 or p_reset_day not between 1 and 28 then raise exception 'Invalid provider budget'; end if;
  v_start := (date_trunc('month',v_now at time zone 'UTC') + make_interval(days => p_reset_day-1)) at time zone 'UTC';
  if v_now < v_start then v_start := v_start - interval '1 month'; end if;
  v_end := v_start + interval '1 month';
  -- Serialize both counter checks in one transaction across ALL server instances.
  perform pg_advisory_xact_lock(7341921);
  select used into v_month_used from public.rail_api_counters where counter_key='provider:month' and bucket=v_start::text;
  select used into v_burst_used from public.rail_api_counters where counter_key='provider:minute' and bucket=v_minute::text;
  if coalesce(v_month_used,0) >= p_limit then
    return jsonb_build_object('allowed',false,'reason','API_BUDGET_REACHED','remaining',0,'retry_after',greatest(1,ceil(extract(epoch from v_end-v_now))::integer));
  end if;
  if coalesce(v_burst_used,0) >= p_burst then
    return jsonb_build_object('allowed',false,'reason','API_BURST_LIMIT','remaining',p_limit-coalesce(v_month_used,0),'retry_after',greatest(1,ceil(extract(epoch from v_minute+interval '1 minute'-v_now))::integer));
  end if;
  insert into public.rail_api_counters as c(counter_key,bucket,used,expires_at)
  values ('provider:month',v_start::text,1,v_end+interval '2 days'),('provider:minute',v_minute::text,1,v_minute+interval '2 minutes')
  on conflict(counter_key,bucket) do update set used=c.used+1;
  return jsonb_build_object('allowed',true,'remaining',p_limit-coalesce(v_month_used,0)-1,'retry_after',0);
end $$;
revoke all on function public.rail_api_take(text,integer,integer) from public, anon, authenticated;
revoke all on function public.rail_api_reserve(integer,integer,integer) from public, anon, authenticated;
grant execute on function public.rail_api_take(text,integer,integer) to service_role;
grant execute on function public.rail_api_reserve(integer,integer,integer) to service_role;

-- Seed the current cycle's usage from the provider dashboard before first deployment.
create or replace function public.rail_api_seed_usage(p_used bigint, p_reset_day integer default 1)
returns void language plpgsql security definer set search_path = '' as $$
declare v_now timestamptz := clock_timestamp(); v_start timestamptz;
begin
  if p_used is null or p_used < 0 or p_reset_day is null or p_reset_day not between 1 and 28 then raise exception 'Invalid usage baseline'; end if;
  v_start := (date_trunc('month',v_now at time zone 'UTC') + make_interval(days => p_reset_day-1)) at time zone 'UTC';
  if v_now < v_start then v_start := v_start - interval '1 month'; end if;
  perform pg_advisory_xact_lock(7341921);
  insert into public.rail_api_counters as c(counter_key,bucket,used,expires_at)
  values('provider:month',v_start::text,p_used,v_start+interval '1 month 2 days')
  on conflict(counter_key,bucket) do update set used=greatest(c.used,excluded.used);
end $$;
revoke all on function public.rail_api_seed_usage(bigint,integer) from public, anon, authenticated;
grant execute on function public.rail_api_seed_usage(bigint,integer) to service_role;

commit;
