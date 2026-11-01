-- Optional operational metrics for the new public lookup actions; no passenger data.
create or replace function public.railq_record_health(p_action text,p_outcome text,p_ms integer,p_cached boolean)
returns void language plpgsql security definer set search_path='' as $$
begin
 if p_action not in ('pnr','live','between','schedule','availability','fare','station','coach','platform','prediction','journey','live-v2','history','timetable','amenities','cancelled','train-search') then return; end if;
 if p_outcome not in ('SUCCESS','INVALID_INPUT','RATE_LIMITED','API_BUDGET_REACHED','API_BURST_LIMIT','PROTECTION_UNAVAILABLE','PROVIDER_NOT_CONFIGURED','PROVIDER_UNAVAILABLE','NOT_FOUND','SERVICE_UNAVAILABLE','POST_REQUIRED','PREDICTION_DISABLED','PREDICTION_UNAVAILABLE','PROVIDER_AUTH_ERROR','SERVICE_PAUSED','TOOL_UNAVAILABLE','INVALID_COMBINATION') then p_outcome := 'SERVICE_UNAVAILABLE'; end if;
 insert into public.railq_health as h(hour,action,outcome,calls,total_ms,cached)
 values(date_trunc('hour',now()),p_action,p_outcome,1,least(60000,greatest(0,coalesce(p_ms,0))),case when p_cached then 1 else 0 end)
 on conflict(hour,action,outcome) do update set calls=h.calls+1,total_ms=h.total_ms+excluded.total_ms,cached=h.cached+excluded.cached;
 delete from public.railq_feedback where hour < now()-interval '30 days';
 delete from public.railq_health where hour < now()-interval '30 days';
 delete from public.railq_tool_reports where id in (select id from public.railq_tool_reports where created_at < now()-interval '30 days' limit 100);
end $$;
revoke all on function public.railq_record_health(text,text,integer,boolean) from public,anon,authenticated;
grant execute on function public.railq_record_health(text,text,integer,boolean) to service_role;
