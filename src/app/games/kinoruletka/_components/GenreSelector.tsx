import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface GenreSelectorProps {
  genres: string[]
  onGenreChange: (genre: string) => void
}

export default function GenreSelector({
  genres,
  onGenreChange,
}: GenreSelectorProps) {
  return (
    <Select onValueChange={onGenreChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Выберите жанр" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Все жанры</SelectItem>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
