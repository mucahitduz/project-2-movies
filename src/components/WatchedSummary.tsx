import { WatchedMovie } from "../types/watched-movie";
import { average } from "../utils/getAverage";

interface WatchedSummaryProps {
  watched: WatchedMovie[];
}

const WatchedSummary = ({ watched }: WatchedSummaryProps) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating ?? 0));
  const avgRuntime = average(
    watched.map((movie) => parseInt(movie.runtime, 10))
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
