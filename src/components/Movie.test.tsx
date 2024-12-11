import { render, screen, fireEvent } from "@testing-library/react";
import Movie from "./Movie";
import "@testing-library/jest-dom";

describe("Movie Component", () => {
  const mockOnSelectMovie = jest.fn();
  const movie = {
    imdbID: "1",
    Title: "Movie A",
    Year: "2023",
    Poster: "https://example.com/movie-a.jpg",
  };

  beforeEach(() => {
    mockOnSelectMovie.mockClear();
  });

  it("should render the movie title, year, and poster", () => {
    render(<Movie movie={movie} onSelectMovie={mockOnSelectMovie} />);

    expect(screen.getByText(movie.Title)).toBeInTheDocument();

    expect(screen.getByText(movie.Year)).toBeInTheDocument();

    expect(screen.getByAltText(`${movie.Title} poster`)).toHaveAttribute(
      "src",
      movie.Poster
    );
  });

  it("should call onSelectMovie with correct imdbID when the movie is clicked", () => {
    render(<Movie movie={movie} onSelectMovie={mockOnSelectMovie} />);

    fireEvent.click(screen.getByText(movie.Title));

    expect(mockOnSelectMovie).toHaveBeenCalledTimes(1);
    expect(mockOnSelectMovie).toHaveBeenCalledWith(movie.imdbID);
  });

  it("should have the correct alt text for the movie poster", () => {
    render(<Movie movie={movie} onSelectMovie={mockOnSelectMovie} />);

    const posterImage = screen.getByAltText(`${movie.Title} poster`);
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute("alt", `${movie.Title} poster`);
  });
});
