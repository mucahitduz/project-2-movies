import Movie from "./Movie";

interface SearchedMoviesProps {
  movies: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  }[];
  onSelectMovie: (id: string) => void;
}

const SearchedMovies = ({ movies, onSelectMovie }: SearchedMoviesProps) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID || movie.Title}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
};

export default SearchedMovies;
