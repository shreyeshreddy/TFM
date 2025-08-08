import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const TMDB = process.env.TMDB_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { id } = req.query
  try{
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB}&append_to_response=videos,credits`
    const r = await fetch(url)
    const data = await r.json()
    res.status(200).json(data)
  }catch(e){
    res.status(500).json({ error: 'failed', details: String(e) })
  }
}
