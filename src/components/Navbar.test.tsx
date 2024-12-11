import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";

describe("Navbar Component", () => {
  it("should render the Navbar with children", () => {
    render(
      <Navbar>
        <div>Test Content</div>
      </Navbar>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render Navbar with multiple children", () => {
    render(
      <Navbar>
        <div>First Child</div>
        <div>Second Child</div>
      </Navbar>
    );

    expect(screen.getByText("First Child")).toBeInTheDocument();
    expect(screen.getByText("Second Child")).toBeInTheDocument();
  });
});
