create extension if not exists pgcrypto;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null check (char_length(event_name) between 2 and 60),
  path text not null default '/',
  session_id text,
  properties jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists analytics_events_occurred_at_idx on public.analytics_events (occurred_at desc);
create index if not exists analytics_events_name_idx on public.analytics_events (event_name, occurred_at desc);
alter table public.analytics_events enable row level security;
drop policy if exists "anonymous analytics inserts" on public.analytics_events;
create policy "anonymous analytics inserts" on public.analytics_events for insert to anon, authenticated with check (true);

-- No public SELECT policy is created. Read events through the Supabase dashboard
-- or a protected server route using a service role key.

create table if not exists public.rail_reminders (
  id uuid primary key default gen_random_uuid(),
  email text not null check (position('@' in email) > 1),
  pnr_ciphertext text not null,
  pnr_iv text not null,
  status text not null default 'active' check (status in ('active', 'paused', 'completed', 'cancelled')),
  consented_at timestamptz not null,
  next_check_at timestamptz not null,
  last_checked_at timestamptz,
  last_status_fingerprint text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '30 days')
);

create index if not exists rail_reminders_due_idx on public.rail_reminders (next_check_at) where status = 'active';
alter table public.rail_reminders enable row level security;

-- No public policy is intentionally created. This table can only be accessed
-- by trusted server code using the Supabase service-role key.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null check (topic in ('feedback', 'correction', 'accessibility', 'advertising')),
  message text not null check (char_length(message) between 10 and 3000),
  status text not null default 'new' check (status in ('new', 'reviewed', 'closed')),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
-- No public policy: messages are inserted and read only by trusted server code.
