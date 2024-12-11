import { useState, useEffect, useCallback } from "react";
import { MovieService } from "../services/MovieService";

export function useMovies(query: string) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
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

  useEffect(() => {
    fetchMovies();
  }, [query, fetchMovies]);

  return { movies, isLoading };
}
