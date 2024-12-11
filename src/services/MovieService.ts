export class MovieService {
  static async fetchMovies(query: string) {
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
    const BASE_URL = import.meta.env.VITE_OMDB_API_URL;
    const URL = `${BASE_URL}${API_KEY}&s=${query}`;

    const res = await fetch(URL);
    if (!res.ok) throw new Error('Error fetching movies');
    const data = await res.json();
    return data.Search;
  }
}
