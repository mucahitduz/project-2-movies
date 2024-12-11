import { render, screen } from "@testing-library/react";
import Loader from "./Loader";
import "@testing-library/jest-dom";

describe("Loader Component", () => {
  it("should render the loading text", () => {
    render(<Loader />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should have the correct className", () => {
    render(<Loader />);

    const loaderElement = screen.getByText("Loading...");
    expect(loaderElement).toHaveClass("loader");
  });
});
