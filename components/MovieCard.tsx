import React, { useRef } from 'react'
import { motion } from 'framer-motion'

type Movie = {
  id: number
  title: string
  year?: number
  poster_path?: string | null
  overview?: string
  vote_average?: number
}

export default function MovieCard({ movie, onAction, onOpen, styleIndex=0 }: { movie: Movie, onAction: (t:'like'|'nope'|'super', m:Movie)=>void, onOpen?: ()=>void, styleIndex?: number }){
  const ref = useRef<HTMLDivElement|null>(null)
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : undefined

  return (
    <motion.div
      ref={ref}
      className='absolute w-[320px] sm:w-[360px] h-[480px] rounded-xl shadow-2xl overflow-hidden cursor-grab'
      initial={{ scale: 1 - styleIndex*0.02, y: styleIndex*8, rotate: (styleIndex-2)*2, opacity: 1 - styleIndex*0.05 }}
      style={{ zIndex: 50 + styleIndex }}
      drag
      dragConstraints={{ left:0, right:0, top:0, bottom:0 }}
      dragElastic={0.16}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={(e, info) => {
        const dx = info.offset.x, dy = info.offset.y
        if(Math.abs(dx) > 150){ onAction(dx>0 ? 'like' : 'nope', movie) }
        else if(dy < -220){ onAction('super', movie) }
      }}
    >
      <div className='w-full h-full bg-gradient-to-b from-slate-800 to-slate-900'>
        <div className='h-[72%] bg-cover bg-center relative' style={{ backgroundImage: posterUrl ? `url(${posterUrl})` : 'linear-gradient(135deg,#1f4068,#9fc5e8)' }}>
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
          <div className='absolute left-3 bottom-3 rounded-md bg-black/40 px-3 py-1 text-sm font-semibold backdrop-blur'>{movie.vote_average ?? '—'}</div>
        </div>
        <div className='p-3 bg-gradient-to-t from-black/10'>
          <div className='flex items-baseline justify-between'>
            <h3 className='font-semibold text-white'>{movie.title}</h3>
            <div className='text-sm text-slate-400'>{movie.year ?? ''}</div>
          </div>
          <p className='mt-2 text-sm text-slate-300 line-clamp-3'>{movie.overview}</p>
          <div className='mt-2 flex items-center gap-2'>
            <button className='text-xs px-2 py-1 rounded bg-white/5' onClick={onOpen}>Details</button>
            <button className='text-xs px-2 py-1 rounded bg-white/5' onClick={()=>onAction('like', movie)}>Save</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
