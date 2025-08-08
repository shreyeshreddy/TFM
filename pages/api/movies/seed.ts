import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const TMDB = process.env.TMDB_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { page = 1 } = req.query
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB}&language=en-US&page=${page}`
  try{
    const r = await fetch(url)
    const data = await r.json()
    data.results = data.results.map((m:any)=>({ ...m, year: m.release_date ? m.release_date.split('-')[0] : null }))
    res.status(200).json(data)
  }catch(e){
    res.status(500).json({ error: 'failed', details: String(e) })
  }
}
