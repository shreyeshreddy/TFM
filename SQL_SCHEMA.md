-- Minimal SQL schema for users, movies cache and user_actions (for Supabase/Postgres)
CREATE TABLE users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text UNIQUE, display_name text, avatar text, created_at timestamptz DEFAULT now());
CREATE TABLE movies (tmdb_id int PRIMARY KEY, meta jsonb, title text, poster_url text, last_fetched timestamptz DEFAULT now());
CREATE TABLE user_actions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid REFERENCES users(id), tmdb_id int REFERENCES movies(tmdb_id), action text, created_at timestamptz DEFAULT now());
