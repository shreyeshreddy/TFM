-- Run this in Supabase SQL editor to create minimal tables
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  display_name text,
  avatar text,
  created_at timestamptz default now()
);

create table movies (
  tmdb_id int primary key,
  meta jsonb,
  title text,
  poster_url text,
  last_fetched timestamptz default now()
);

create table user_actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  tmdb_id int references movies(tmdb_id),
  action text,
  created_at timestamptz default now()
);
