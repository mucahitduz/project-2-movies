import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useState } from "react";
import SearchInput from "./components/SearchInput";
import SearchedMovies from "./components/SearchedMovies";
import MovieListBox from "./components/MovieListBox";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import SelectedMovie from "./components/SelectedMovie";
import { WatchedMovie } from "./types/watched-movie";
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const [watched, setWatched] = useState<WatchedMovie[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");

  const { movies, isLoading, fetchMovies } = useMovies(query);

  function handleSelectMovie(id: string) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId("");
  }

  function handleAddWatched(movie: WatchedMovie) {
    setWatched((prevWatched) => [...prevWatched, movie]);
  }

  function handleDeleteWatchedMovie(id: string) {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbId !== id)
    );
  }

  function handleSearch() {
    fetchMovies();
  }

  return (
    <>
      <Navbar>
        <div className="logo">
          <span role="img">🍿</span>
          <h1>Movies</h1>
        </div>
        <SearchInput
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />
        <p className="num-results">
          Found <strong>{movies?.length}</strong> results
        </p>
      </Navbar>

      <Main>
        <MovieListBox>
          {isLoading ? (
            <Loader />
          ) : (
            <SearchedMovies movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </MovieListBox>
        <MovieListBox>
          <>
            {selectedId ? (
              <SelectedMovie
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatchedMovie={handleDeleteWatchedMovie}
                />
              </>
            )}
          </>
        </MovieListBox>
      </Main>
    </>
  );
}
