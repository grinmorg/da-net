export interface Movie {
    id: number;
    title: string;
    genre: string;
    description: string;
    poster_path?: string; // Для TMDB
  }