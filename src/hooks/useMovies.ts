import { useState, useCallback } from "react";
import { MovieService } from "../services/MovieService";

export function useMovies(query: string) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    if (!query) return;
    try {
      setIsLoading(true);
      const movieData = await MovieService.fetchMovies(query);
      setMovies(movieData);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }, [query]);

  return { movies, isLoading, fetchMovies };
}
