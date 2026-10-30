-- RailKit counters are independent from historical RailRadar counters.
begin;
create or replace function public.railkit_api_reserve(p_limit integer, p_burst integer, p_reset_day integer default 1)
returns jsonb language plpgsql security invoker set search_path = '' as $$
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
  perform pg_advisory_xact_lock(7341922);
  select used into v_month_used from public.rail_api_counters where counter_key='railkit:month' and bucket=v_start::text;
  select used into v_burst_used from public.rail_api_counters where counter_key='railkit:minute' and bucket=v_minute::text;
  if coalesce(v_month_used,0) >= p_limit then
    return jsonb_build_object('allowed',false,'reason','API_BUDGET_REACHED','remaining',0,'retry_after',greatest(1,ceil(extract(epoch from v_end-v_now))::integer));
  end if;
  if coalesce(v_burst_used,0) >= p_burst then
    return jsonb_build_object('allowed',false,'reason','API_BURST_LIMIT','remaining',p_limit-coalesce(v_month_used,0),'retry_after',greatest(1,ceil(extract(epoch from v_minute+interval '1 minute'-v_now))::integer));
  end if;
  insert into public.rail_api_counters as c(counter_key,bucket,used,expires_at)
  values ('railkit:month',v_start::text,1,v_end+interval '2 days'),('railkit:minute',v_minute::text,1,v_minute+interval '2 minutes')
  on conflict(counter_key,bucket) do update set used=c.used+1;
  return jsonb_build_object('allowed',true,'remaining',p_limit-coalesce(v_month_used,0)-1,'retry_after',0);
end $$;
revoke all on function public.railkit_api_reserve(integer,integer,integer) from public, anon, authenticated;
grant execute on function public.railkit_api_reserve(integer,integer,integer) to service_role;

create or replace function public.railkit_api_seed_usage(p_used bigint, p_reset_day integer default 1)
returns void language plpgsql security invoker set search_path = '' as $$
declare v_now timestamptz := clock_timestamp(); v_start timestamptz;
begin
  if p_used is null or p_used < 0 or p_reset_day is null or p_reset_day not between 1 and 28 then raise exception 'Invalid usage baseline'; end if;
  v_start := (date_trunc('month',v_now at time zone 'UTC') + make_interval(days => p_reset_day-1)) at time zone 'UTC';
  if v_now < v_start then v_start := v_start - interval '1 month'; end if;
  perform pg_advisory_xact_lock(7341922);
  insert into public.rail_api_counters as c(counter_key,bucket,used,expires_at)
  values('railkit:month',v_start::text,p_used,v_start+interval '1 month 2 days')
  on conflict(counter_key,bucket) do update set used=greatest(c.used,excluded.used);
end $$;
revoke all on function public.railkit_api_seed_usage(bigint,integer) from public, anon, authenticated;
grant execute on function public.railkit_api_seed_usage(bigint,integer) to service_role;
create or replace function public.railkit_health_snapshot(p_reset_day integer default 1)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare v_start timestamptz; v_used bigint; v_stats jsonb;
begin
 if p_reset_day is null or p_reset_day not between 1 and 28 then raise exception 'Invalid reset day'; end if;
 v_start := (date_trunc('month',now() at time zone 'UTC')+make_interval(days=>p_reset_day-1)) at time zone 'UTC';
 if now()<v_start then v_start:=v_start-interval '1 month'; end if;
 select used into v_used from public.rail_api_counters where counter_key='railkit:month' and bucket=v_start::text;
 v_stats := public.railq_health_snapshot(p_reset_day);
 return v_stats || jsonb_build_object('used',coalesce(v_used,0),'cycle_start',v_start);
end $$;
revoke all on function public.railkit_health_snapshot(integer) from public,anon,authenticated;
grant execute on function public.railkit_health_snapshot(integer) to service_role;
commit;
