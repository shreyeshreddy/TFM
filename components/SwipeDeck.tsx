import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import DetailModal from './DetailModal'
import useSWR from 'swr'

type Movie = {
  id: number
  title: string
  year?: number
  poster_path?: string | null
  overview?: string
  vote_average?: number
  genre_ids?: number[]
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function SwipeDeck(){    
  const { data, error } = useSWR('/api/movies/seed', fetcher)
  const [deck, setDeck] = useState<Movie[]>([])
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [selected, setSelected] = useState<Movie | null>(null)

  useEffect(()=>{
    if(data && data.results) setDeck(data.results.slice(0, 32))
  },[data])

  async function openDetails(id: number){
    const res = await fetch(`/api/movies/${id}`)
    const json = await res.json()
    setSelected(json)
  }

  function handleAction(type: 'like'|'nope'|'super', m: Movie){
    if(type === 'like' || type === 'super'){
      setWatchlist(w => Array.from(new Map([...w, m].map(x=>[x.id,x])).values()))
    }
    setDeck(d => d.filter(x=>x.id !== m.id))
    // send server side
    fetch('/api/user/action', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ tmdb_id: m.id, action: type }) }).catch(()=>{})
  }

  return (
    <div>
      <div className='relative h-[520px] flex items-center justify-center'>
        {deck.length === 0 && <div className='text-center text-slate-400'>You're all caught up — come back for more.</div>}
        {deck.slice(0,8).reverse().map((m, i) => (
          <MovieCard key={m.id} movie={m} onAction={handleAction} onOpen={()=>openDetails(m.id)} styleIndex={i} />
        ))}
      </div>

      <div className='flex items-center justify-center gap-6 mt-4'>
        <button aria-label="Nope" className='w-14 h-14 rounded-full bg-white/90 text-slate-900 shadow' onClick={()=>{ const top = deck[0]; if(top) handleAction('nope', top)}}>✕</button>
        <button aria-label="Super-like" className='w-14 h-14 rounded-full bg-amber-400 text-slate-900 shadow' onClick={()=>{ const top = deck[0]; if(top) handleAction('super', top)}}>★</button>
        <button aria-label="Like" className='w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow' onClick={()=>{ const top = deck[0]; if(top) handleAction('like', top)}}>♥</button>
      </div>

      <div className='mt-4'>
        <h3 className='text-sm font-semibold'>Watchlist</h3>
        <div className='mt-2 grid grid-cols-2 gap-2'>
          {watchlist.map(w => <div key={w.id} className='p-2 bg-[rgba(255,255,255,0.02)] rounded'>{w.title}</div>)}
        </div>
      </div>

      <DetailModal movie={selected} onClose={()=>setSelected(null)} />
    </div>
  )
}
