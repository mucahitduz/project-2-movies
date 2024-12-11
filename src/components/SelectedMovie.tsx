import { useEffect, useState, useCallback } from "react";
import { SelectedMovieResponse } from "../types/selected-movie";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { WatchedMovie } from "../types/watched-movie";

interface SelectedMovieProps {
  selectedId: string;
  watched: WatchedMovie[];
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
}

const SelectedMovie = ({
  selectedId,
  watched,
  onCloseMovie,
  onAddWatched,
}: SelectedMovieProps) => {
  const [movie, setMovie] = useState<SelectedMovieResponse | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const isWatched = movie?.imdbID
    ? watched.map((movie) => movie.imdbId).includes(movie.imdbID)
    : false;
  const watchedMovieUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  const handleCloseMovie = () => {
    onCloseMovie();
  };

  const handleAddWatched = () => {
    const watchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ")[0],
      userRating,
    };
    onAddWatched(watchedMovie);
    handleCloseMovie();
  };

  const KEY = `50fc7933`;
  const URL = `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`;

  const fetchSelectedMovie = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(URL);
      if (!res.ok) {
        setIsLoading(false);
        throw new Error("There was an error while fetching movies");
      }
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setIsLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchSelectedMovie();
  }, [selectedId, fetchSelectedMovie]);

  useEffect(() => {
    if (movie && movie.Title) {
      document.title = `Movie | ${movie.Title}`;
    }
    return function () {
      document.title = "Movies";
    };
  }, [movie]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Year: year,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐️{imdbRating} IMDb rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    color="#fcc419"
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated this movie {watchedMovieUserRating}
                  <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default SelectedMovie;
