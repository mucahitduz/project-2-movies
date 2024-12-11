import { WatchedMovie as WatchedMovieType } from '../types/watched-movie';

interface WatchedMovieProps {
  movie: WatchedMovieType;
  handleDeleteWatchedMovie: (id: string) => void;
}

const WatchedMovie = ({
  movie,
  handleDeleteWatchedMovie,
}: WatchedMovieProps) => {
  const onDeleteWatched = () => {
    handleDeleteWatchedMovie(movie.imdbId);
  };
  return (
    <li key={movie.imdbId}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={onDeleteWatched}>
          X
        </button>
      </div>
    </li>
  );
};

export default WatchedMovie;
