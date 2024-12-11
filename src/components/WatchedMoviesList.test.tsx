import { render, screen, fireEvent } from "@testing-library/react";
import WatchedMoviesList from "./WatchedMoviesList";
import { WatchedMovie as WatchedMovieType } from "../types/watched-movie";
import "@testing-library/jest-dom";

describe("WatchedMoviesList Component", () => {
  const mockMovie: WatchedMovieType = {
    imdbId: "12345",
    title: "Mock Movie",
    year: "2023",
    poster: "mock-poster.jpg",
    imdbRating: 8.5,
    runtime: "120",
    userRating: 9,
  };

  const mockOnDeleteWatchedMovie = jest.fn();

  it("should call onDeleteWatchedMovie when delete button is clicked", () => {
    render(
      <WatchedMoviesList
        watched={[mockMovie]}
        onDeleteWatchedMovie={mockOnDeleteWatchedMovie}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /x/i });

    fireEvent.click(deleteButton);

    expect(mockOnDeleteWatchedMovie).toHaveBeenCalledWith("12345");
    expect(mockOnDeleteWatchedMovie).toHaveBeenCalledTimes(1);
  });

  it("should render multiple movies", () => {
    const movies: WatchedMovieType[] = [
      { ...mockMovie, imdbId: "12345" },
      { ...mockMovie, imdbId: "67890", title: "Another Movie" },
    ];

    render(
      <WatchedMoviesList
        watched={movies}
        onDeleteWatchedMovie={mockOnDeleteWatchedMovie}
      />
    );

    expect(screen.getByText("Mock Movie")).toBeInTheDocument();
    expect(screen.getByAltText("Mock Movie poster")).toBeInTheDocument();

    expect(screen.getByText("Another Movie")).toBeInTheDocument();
    expect(screen.getByAltText("Another Movie poster")).toBeInTheDocument();
  });

  it("should render an empty list when no movies are provided", () => {
    render(
      <WatchedMoviesList
        watched={[]}
        onDeleteWatchedMovie={mockOnDeleteWatchedMovie}
      />
    );

    expect(screen.queryByRole("listitem")).toBeNull();
  });
});
