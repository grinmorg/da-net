'use client'

import { useState } from 'react'

import { Movie } from './_lib/types'
import { movies } from './_lib/movies'
import GenreSelector from './_components/GenreSelector'
import SpinButton from './_components/SpinButton'
import MovieCard from './_components/MovieCard'

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)

  const genres = Array.from(new Set(movies.map((movie: Movie) => movie.genre)))

  const handleSpin = () => {
    const filteredMovies =
      selectedGenre === 'all'
        ? movies
        : movies.filter((movie: Movie) => movie.genre === selectedGenre)
    const randomMovie =
      filteredMovies[Math.floor(Math.random() * filteredMovies.length)]
    setCurrentMovie(randomMovie)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-3xl font-bold">Кинорулетка</h1>
      <GenreSelector genres={genres} onGenreChange={setSelectedGenre} />
      <div className="my-4">
        <SpinButton onClick={handleSpin} />
      </div>
      <MovieCard movie={currentMovie} />
    </div>
  )
}
