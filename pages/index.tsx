import Head from 'next/head'
import SwipeDeck from '../components/SwipeDeck'

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[#071029] to-[#05101a] text-white p-6 flex items-center justify-center'>
      <Head><title>Tinder for Movies — Preview</title></Head>
      <div className='w-[390px] sm:w-[420px] bg-[rgba(255,255,255,0.02)] rounded-2xl p-4 shadow-2xl'>
        <div className='flex items-center justify-between mb-3'>
          <div>
            <h1 className='text-lg font-semibold tracking-tight'>Tinder for Movies</h1>
            <div className='text-xs text-slate-400'>Discover films — swipe to curate your watchlist</div>
          </div>
          <div className='flex items-center gap-2'>
            <button className='px-3 py-1 text-xs rounded-full bg-white/5'>Filters</button>
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-amber-400 flex items-center justify-center text-slate-900 font-bold'>G</div>
          </div>
        </div>
        <SwipeDeck />
      </div>
    </div>
  )
}
