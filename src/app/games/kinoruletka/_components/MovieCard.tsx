import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Movie } from '../_lib/types'

interface MovieCardProps {
  movie: Movie | null
}

export default function MovieCard({ movie }: MovieCardProps) {
  if (!movie) return <p>Нажмите "Крутить", чтобы выбрать фильм!</p>

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            className="mx-auto mb-4 rounded-md"
          />
        )}
        <p>
          <strong>Жанр:</strong> {movie.genre}
        </p>
        <p>{movie.description}</p>
      </CardContent>
    </Card>
  )
}
