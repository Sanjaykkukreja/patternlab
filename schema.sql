-- Pattern Lab — Supabase schema.
-- Paste this whole file into  Supabase Studio  >  SQL Editor  >  New query  >  Run.

create table if not exists public.profiles (
  id         text primary key,
  name       text not null,
  created_at timestamptz default now()
);

create table if not exists public.state (
  user_id    text not null,
  kind       text not null,            -- 'practice' | 'flash'
  item_key   text not null,            -- stable global id, e.g. maths/trig/fg::SC Q1
  data       jsonb not null default '{}',
  updated_at timestamptz default now(),
  primary key (user_id, kind, item_key)
);

alter table public.profiles enable row level security;
alter table public.state    enable row level security;

-- Private single-family app: allow the public (anon) key full access.
-- The anon key ships inside the frontend, so anyone with your URL + key could
-- read/write. That is an acceptable trade-off for a private study tool.
-- To lock it down properly later, switch to Supabase Auth and scope by auth.uid().
drop policy if exists "anon all profiles" on public.profiles;
create policy "anon all profiles" on public.profiles for all to anon using (true) with check (true);

drop policy if exists "anon all state" on public.state;
create policy "anon all state" on public.state for all to anon using (true) with check (true);
