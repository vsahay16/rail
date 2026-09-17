-- Additive migration. Requires railq-hotfix.sql to have been applied already.
-- No existing counters are reset and no passenger records are read.
begin;
create table if not exists public.railq_health (
  hour timestamptz not null, action text not null, outcome text not null,
  calls bigint not null default 0, total_ms bigint not null default 0, cached bigint not null default 0,
  primary key(hour,action,outcome)
);
create table if not exists public.railq_tool_reports (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(), tool text not null, code text not null
);
create index if not exists railq_reports_created on public.railq_tool_reports(created_at);
alter table public.railq_health enable row level security;
alter table public.railq_tool_reports enable row level security;
revoke all on public.railq_health,public.railq_tool_reports from public,anon,authenticated;
grant select,insert on public.railq_tool_reports to service_role;
grant usage,select on sequence public.railq_tool_reports_id_seq to service_role;

create or replace function public.railq_record_health(p_action text,p_outcome text,p_ms integer,p_cached boolean)
returns void language plpgsql security definer set search_path='' as $$
begin
 if p_action not in ('pnr','live','between','schedule','availability','fare','station','coach','platform') then return; end if;
 if p_outcome not in ('SUCCESS','INVALID_INPUT','RATE_LIMITED','API_BUDGET_REACHED','API_BURST_LIMIT','PROTECTION_UNAVAILABLE','PROVIDER_NOT_CONFIGURED','PROVIDER_UNAVAILABLE','NOT_FOUND','SERVICE_UNAVAILABLE') then p_outcome := 'SERVICE_UNAVAILABLE'; end if;
 insert into public.railq_health as h(hour,action,outcome,calls,total_ms,cached)
 values(date_trunc('hour',now()),p_action,p_outcome,1,least(60000,greatest(0,coalesce(p_ms,0))),case when p_cached then 1 else 0 end)
 on conflict(hour,action,outcome) do update set calls=h.calls+1,total_ms=h.total_ms+excluded.total_ms,cached=h.cached+excluded.cached;
 delete from public.railq_health where hour < now()-interval '30 days';
 delete from public.railq_tool_reports where id in (select id from public.railq_tool_reports where created_at < now()-interval '30 days' limit 100);
end $$;

create or replace function public.railq_health_snapshot(p_reset_day integer default 1)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_start timestamptz; v_used bigint; v_data jsonb; v_rows jsonb;
begin
 if p_reset_day not between 1 and 28 or p_reset_day is null then raise exception 'Invalid reset day'; end if;
 v_start := (date_trunc('month',now() at time zone 'UTC')+make_interval(days=>p_reset_day-1)) at time zone 'UTC';
 if now()<v_start then v_start:=v_start-interval '1 month'; end if;
 select used into v_used from public.rail_api_counters where counter_key='provider:month' and bucket=v_start::text;
 select jsonb_build_object('used',coalesce(v_used,0),'calls',coalesce(sum(calls),0),
 'failures',coalesce(sum(calls) filter(where outcome<>'SUCCESS'),0),'cached',coalesce(sum(cached),0),
 'average_ms',coalesce(sum(total_ms)/nullif(sum(calls),0),0),
 'reports',(select count(*) from public.railq_tool_reports where created_at>=now()-interval '24 hours'))
 into v_data from public.railq_health where hour>=now()-interval '24 hours';
 select coalesce(jsonb_agg(r),'[]'::jsonb) into v_rows from
 (select action,outcome,sum(calls) as calls from public.railq_health where hour>=now()-interval '24 hours' group by action,outcome order by action,outcome) r;
 return v_data || jsonb_build_object('outcomes',v_rows);
end $$;
revoke all on function public.railq_record_health(text,text,integer,boolean) from public,anon,authenticated;
revoke all on function public.railq_health_snapshot(integer) from public,anon,authenticated;
grant execute on function public.railq_record_health(text,text,integer,boolean) to service_role;
grant execute on function public.railq_health_snapshot(integer) to service_role;
commit;
