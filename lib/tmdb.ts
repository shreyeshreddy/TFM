    export async function fetchPopular(page=1){
  const key = process.env.TMDB_API_KEY
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`)
  return res.json()
}

export async function fetchMovie(id:any){
  const key = process.env.TMDB_API_KEY
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=videos,credits`)
  return res.json()
}
