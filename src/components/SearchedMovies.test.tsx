import { render, screen, fireEvent } from "@testing-library/react";
import SearchedMovies from "./SearchedMovies";
import "@testing-library/jest-dom";

jest.mock("./Movie", () => ({
  __esModule: true,
  default: jest.fn(({ movie, onSelectMovie }) => (
    <div onClick={() => onSelectMovie(movie.imdbID)}>{movie.Title}</div>
  )),
}));

describe("SearchedMovies Component", () => {
  it("should render movies correctly", () => {
    const mockMovies = [
      { imdbID: "1", Title: "Movie 1", Year: "2023", Poster: "" },
      { imdbID: "2", Title: "Movie 2", Year: "2023", Poster: "" },
    ];

    const mockSelectMovie = jest.fn();

    render(
      <SearchedMovies movies={mockMovies} onSelectMovie={mockSelectMovie} />
    );

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("should call onSelectMovie when a movie is clicked", () => {
    const mockMovies = [
      { imdbID: "1", Title: "Movie 1", Year: "2023", Poster: "" },
    ];
    const mockSelectMovie = jest.fn();

    render(
      <SearchedMovies movies={mockMovies} onSelectMovie={mockSelectMovie} />
    );

    fireEvent.click(screen.getByText("Movie 1"));

    expect(mockSelectMovie).toHaveBeenCalledWith("1");
  });

  it("should render nothing if movies array is empty", () => {
    render(<SearchedMovies movies={[]} onSelectMovie={() => {}} />);

    expect(screen.queryByText("Mocked Movie")).not.toBeInTheDocument();
  });

  it("should render a movie for each item in the movies array", () => {
    const mockMovies = [
      { imdbID: "1", Title: "Movie 1", Year: "2023", Poster: "" },
      { imdbID: "2", Title: "Movie 2", Year: "2023", Poster: "" },
    ];

    render(<SearchedMovies movies={mockMovies} onSelectMovie={() => {}} />);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });
});
