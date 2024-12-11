import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "./SearchInput";
import "@testing-library/jest-dom";

describe("SearchInput Component", () => {
  it("should render with initial query value", () => {
    const mockSetQuery = jest.fn();
    const mockOnSearch = jest.fn();

    render(
      <SearchInput
        query="movie"
        setQuery={mockSetQuery}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByPlaceholderText("Search movies...")).toHaveValue(
      "movie"
    );
  });

  it("should call setQuery when the input changes", () => {
    const mockSetQuery = jest.fn();
    const mockOnSearch = jest.fn();

    render(
      <SearchInput query="" setQuery={mockSetQuery} onSearch={mockOnSearch} />
    );

    fireEvent.change(screen.getByPlaceholderText("Search movies..."), {
      target: { value: "new query" },
    });

    expect(mockSetQuery).toHaveBeenCalledWith("new query");
  });

  it("should call onSearch when Enter key is pressed", () => {
    const mockSetQuery = jest.fn();
    const mockOnSearch = jest.fn();

    render(
      <SearchInput
        query="movie"
        setQuery={mockSetQuery}
        onSearch={mockOnSearch}
      />
    );

    fireEvent.keyDown(screen.getByPlaceholderText("Search movies..."), {
      key: "Enter",
      code: "Enter",
    });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
