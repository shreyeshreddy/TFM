# Tinder for Movies - Complete Starter (Supabase + TMDb + UI Kit)

This enhanced scaffold includes:
- Next.js + TypeScript + Tailwind + Framer Motion
- TMDb proxy endpoints (server-side) including trailer lookup
- Supabase wiring (example client + server-side guidance) for auth & persistent watchlist
- Improved UI components (MovieCard, DetailModal) with high-fidelity Tailwind classes
- Deployment guide for Vercel + environment variables

## Quick start (local)
1. Install deps: `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in keys:
   - TMDB_API_KEY (from https://www.themoviedb.org/settings/api)
   - NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (from Supabase project)
   - SUPABASE_SERVICE_ROLE_KEY (for server-side only, optional for advanced server actions)
3. Run dev: `npm run dev`

## Supabase
- Create a Supabase project and the tables using the supplied `supabase_schema.sql`.
- Use the anonymous key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the frontend for auth client.
- For server-side operations that need elevated rights, use `SUPABASE_SERVICE_ROLE_KEY` in server env only.

## Deployment (Vercel)
1. Push the repo to GitHub.
2. Import project in Vercel.
3. Add environment variables in Vercel dashboard (same as .env.local).
4. Deploy — Vercel will build and host the app. Make sure TMDB key and Supabase keys are set.

## What I added
- `/api/movies/seed` (TMDb popular)
- `/api/movies/[id]` (movie details + videos)
- `/api/user/action` (record user actions — example server route)
- Supabase client helper (`lib/supabaseClient.ts`)
- UI components: `SwipeDeck`, `MovieCard`, `DetailModal`
- `supabase_schema.sql` for Postgres tables

## Notes on UI
- High-fidelity, mobile-first design using Tailwind utility classes.
- Framer Motion used for swipe physics & micro-interactions.
- Modal uses YouTube embed for trailers (TMDb provides YouTube keys).

If you want, I can also generate a Figma-ready spec (assets + exact layout frames) next.
