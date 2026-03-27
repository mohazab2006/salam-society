-- =============================================
-- Salam Society — Supabase Schema
-- =============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- =============================================
-- USER ROLES
-- =============================================
create table if not exists public.user_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  role text not null check (role in ('admin', 'editor')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.user_profiles enable row level security;

create policy "Admins can view all profiles"
  on public.user_profiles for select
  using (
    exists (
      select 1 from public.user_profiles up
      where up.user_id = auth.uid() and up.role = 'admin'
    )
  );

create policy "Users can view own profile"
  on public.user_profiles for select
  using (user_id = auth.uid());

-- =============================================
-- EVENTS
-- =============================================
create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text not null,
  audience_category text not null check (audience_category in ('brothers', 'sisters', 'everyone')),
  age_group text,
  date date not null,
  start_time time,
  end_time time,
  location text not null,
  signup_required boolean default false,
  signup_link text,
  image_url text,
  featured boolean default false,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.events enable row level security;

create policy "Public can view published events"
  on public.events for select
  using (published = true);

create policy "Admins and editors can manage events"
  on public.events for all
  using (
    exists (
      select 1 from public.user_profiles up
      where up.user_id = auth.uid() and up.role in ('admin', 'editor')
    )
  );

-- =============================================
-- PROGRAMS
-- =============================================
create table if not exists public.programs (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  description text not null,
  audience_category text not null check (audience_category in ('brothers', 'sisters', 'everyone')),
  age_group text,
  schedule text not null,
  location text not null,
  signup_required boolean default false,
  signup_link text,
  image_url text,
  featured boolean default false,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.programs enable row level security;

create policy "Public can view published programs"
  on public.programs for select
  using (published = true);

create policy "Admins and editors can manage programs"
  on public.programs for all
  using (
    exists (
      select 1 from public.user_profiles up
      where up.user_id = auth.uid() and up.role in ('admin', 'editor')
    )
  );

-- =============================================
-- MEDIA
-- =============================================
create table if not exists public.media (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('image', 'video')),
  title text,
  caption text,
  file_url text not null,
  thumbnail_url text,
  featured boolean default false,
  section text default 'moments',
  sort_order integer default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.media enable row level security;

create policy "Public can view published media"
  on public.media for select
  using (published = true);

create policy "Admins and editors can manage media"
  on public.media for all
  using (
    exists (
      select 1 from public.user_profiles up
      where up.user_id = auth.uid() and up.role in ('admin', 'editor')
    )
  );

-- =============================================
-- PARTNERS
-- =============================================
create table if not exists public.partners (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text not null,
  website_url text,
  category text check (category in ('mosque', 'organization')),
  sort_order integer default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.partners enable row level security;

create policy "Public can view published partners"
  on public.partners for select
  using (published = true);

create policy "Admins and editors can manage partners"
  on public.partners for all
  using (
    exists (
      select 1 from public.user_profiles up
      where up.user_id = auth.uid() and up.role in ('admin', 'editor')
    )
  );

-- =============================================
-- INITIATIVES
-- =============================================
create table if not exists public.initiatives (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  image_url text,
  status text default 'active' check (status in ('active', 'completed', 'upcoming')),
  date date,
  sort_order integer default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.initiatives enable row level security;

create policy "Public can view published initiatives"
  on public.initiatives for select
  using (published = true);

create policy "Admins and editors can manage initiatives"
  on public.initiatives for all
  using (
    exists (
      select 1 from public.user_profiles up
      where up.user_id = auth.uid() and up.role in ('admin', 'editor')
    )
  );

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger events_updated_at before update on public.events
  for each row execute function update_updated_at();
create trigger programs_updated_at before update on public.programs
  for each row execute function update_updated_at();
create trigger media_updated_at before update on public.media
  for each row execute function update_updated_at();
create trigger partners_updated_at before update on public.partners
  for each row execute function update_updated_at();
create trigger initiatives_updated_at before update on public.initiatives
  for each row execute function update_updated_at();
create trigger user_profiles_updated_at before update on public.user_profiles
  for each row execute function update_updated_at();

-- =============================================
-- SEED: Women in Islam Event
-- =============================================
insert into public.events (
  title, slug, description, audience_category, age_group,
  date, start_time, end_time, location,
  signup_required, signup_link, featured, published
) values (
  'Women in Islam',
  'women-in-islam-2025',
  'Join us for Women in Islam — a special program for girls ages 6–11. Through engaging stories, thoughtful discussions, and fun activities, we''ll explore the inspiring lives of incredible women in Islam like Maryam, Khadijah, Aisha, Fatimah, and Asiyah. A beautiful opportunity to learn, connect, and grow while discovering powerful role models.',
  'sisters',
  '6–11',
  '2025-04-04',
  '11:00:00',
  '16:00:00',
  'Kanata Muslims Community Centre, Ottawa, ON',
  true,
  'https://kanatamuslims.ca/events/womanofiman/',
  true,
  true
) on conflict (slug) do nothing;
