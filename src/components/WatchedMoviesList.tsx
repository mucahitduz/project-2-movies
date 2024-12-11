import WatchedMovie from "./WatchedMovie";
import { WatchedMovie as WatchedMovieType } from "../types/watched-movie";

interface WatchedMoviesListProps {
  watched: WatchedMovieType[];
  onDeleteWatchedMovie: (id: string) => void;
}

const WatchedMoviesList = ({
  watched,
  onDeleteWatchedMovie,
}: WatchedMoviesListProps) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbId}
          handleDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
