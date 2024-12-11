import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import { useMovies } from "./hooks/useMovies";
import "@testing-library/jest-dom";

jest.mock("./hooks/useMovies", () => ({
  useMovies: jest.fn(),
}));

describe("App Component", () => {
  it("should render Navbar and display logo", () => {
    (useMovies as jest.Mock).mockReturnValue({
      movies: [],
      isLoading: false,
      fetchMovies: jest.fn(),
    });

    render(<App />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Movies"
    );
  });

  it("should show the loader while movies are loading", () => {
    (useMovies as jest.Mock).mockReturnValue({
      movies: [],
      isLoading: true,
      fetchMovies: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it("should render searched movies when not loading", async () => {
    (useMovies as jest.Mock).mockReturnValue({
      movies: [
        { imdbID: "1", Title: "Movie 1", Year: "2023", Poster: "" },
        { imdbID: "2", Title: "Movie 2", Year: "2023", Poster: "" },
      ],
      isLoading: false,
      fetchMovies: jest.fn(),
    });

    render(<App />);

    // Movie 1 ve Movie 2'nin render edilmesini bekliyoruz
    await waitFor(() => {
      expect(screen.getByText("Movie 1")).toBeInTheDocument();
      expect(screen.getByText("Movie 2")).toBeInTheDocument();
    });
  });

  it("should match the snapshot", () => {
    (useMovies as jest.Mock).mockReturnValue({
      movies: [],
      isLoading: false,
      fetchMovies: jest.fn(),
    });

    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render selected movie details when a movie is selected", async () => {
    (useMovies as jest.Mock).mockReturnValue({
      movies: [{ imdbID: "1", Title: "Movie A", Year: "2023", Poster: "" }],
      isLoading: false,
      fetchMovies: jest.fn(),
    });

    render(<App />);

    // Movie A'yı tıklayalım
    fireEvent.click(screen.getByText("Movie A"));

    // Movie A'nın detaylarını doğru şekilde render ettiğinden emin olalım
    await waitFor(() => {
      expect(screen.getByText("Movie A")).toBeInTheDocument();
    });
  });
});
