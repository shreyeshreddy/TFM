    import type { NextApiRequest, NextApiResponse } from 'next'

    // Example: record a user action. For production, validate auth and use Supabase service role key server-side.

    import fetch from 'node-fetch'


    export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end()
  const { tmdb_id, action } = req.body
  // For now just echo; in production insert into your DB or call Supabase
  return res.status(200).json({ ok: true, tmdb_id, action })
}

