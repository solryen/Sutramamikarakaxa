create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  baby_age_label text,
  baby_age_min integer,
  baby_age_max integer,
  language text not null default 'en',
  source text not null,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "Allow anonymous newsletter inserts"
on public.newsletter_subscribers
for insert
to anon, authenticated
with check (
  email is not null
  and position('@' in email) > 1
);
