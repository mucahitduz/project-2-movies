interface MovieProps {
  movie: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  };
  onSelectMovie: (id: string) => void;
}

const Movie = ({ movie, onSelectMovie }: MovieProps) => {
  const handleSelectMovie = () => {
    onSelectMovie(movie.imdbID);
  };

  return (
    <li>
      <button
        onClick={handleSelectMovie}
        style={{ all: "unset", cursor: "pointer" }}
      >
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </button>
    </li>
  );
};

export default Movie;
