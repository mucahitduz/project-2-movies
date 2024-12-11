import { render, screen, fireEvent } from "@testing-library/react";
import MovieListBox from "./MovieListBox";
import "@testing-library/jest-dom";

describe("MovieListBox Component", () => {
  it("should render the children content when isOpen is true", () => {
    render(
      <MovieListBox>
        <div>Test Content</div>
      </MovieListBox>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should hide the children content when isOpen is false", () => {
    render(
      <MovieListBox>
        <div>Test Content</div>
      </MovieListBox>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("should toggle content visibility when the button is clicked", () => {
    render(
      <MovieListBox>
        <div>Test Content</div>
      </MovieListBox>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render the correct button text based on isOpen state", () => {
    render(
      <MovieListBox>
        <div>Test Content</div>
      </MovieListBox>
    );

    expect(screen.getByRole("button")).toHaveTextContent("–");

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("+");

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("–");
  });
});
