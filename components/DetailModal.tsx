import React from 'react'

export default function DetailModal({ movie, onClose }: { movie: any, onClose: ()=>void }){
  if(!movie) return null
  // TMDb often provides videos with site='YouTube'
  const youtube = movie.videos?.results?.find((v:any)=>v.site==='YouTube')
  const key = youtube ? youtube.key : null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
      <div className='w-[92%] max-w-3xl bg-gradient-to-b from-[#071029] to-[#041423] rounded-xl p-4 shadow-2xl'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h2 className='text-xl font-bold'>{movie.title} <span className='text-sm text-slate-400'>({movie.release_date?.split('-')[0]})</span></h2>
            <div className='text-sm text-slate-400 mt-1'>{movie.runtime ? movie.runtime + ' min' : ''} · {movie.genres?.map((g:any)=>g.name).join(', ')}</div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='text-sm text-slate-400'>Rating</div>
            <div className='px-3 py-1 rounded bg-white/5 font-semibold'>{movie.vote_average}</div>
            <button className='text-sm px-3 py-1 rounded bg-white/5' onClick={onClose}>Close</button>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='md:col-span-2'>
            <p className='text-slate-300'>{movie.overview}</p>
            {key && (
              <div className='mt-4 aspect-video bg-black rounded overflow-hidden'>
                <iframe src={`https://www.youtube.com/embed/${key}`} title='Trailer' allowFullScreen className='w-full h-full'></iframe>
              </div>
            )}
          </div>
          <div className='space-y-3'>
            <div className='p-3 bg-white/3 rounded'>
              <div className='text-sm text-slate-300'>Cast</div>
              <div className='text-sm text-slate-200 mt-2'>{movie.credits?.cast?.slice(0,6).map((c:any)=>c.name).join(', ')}</div>
            </div>
            <div className='p-3 bg-white/3 rounded'>
              <div className='text-sm text-slate-300'>More</div>
              <div className='text-sm text-slate-200 mt-2'>Runtime: {movie.runtime} min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
