import { render, screen } from "@testing-library/react";
import Main from "./Main";
import "@testing-library/jest-dom";

describe("Main Component", () => {
  it("should render the children correctly", () => {
    render(
      <Main>
        <p>Test Child Content</p>
      </Main>
    );

    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
  });

  it("should have the correct className", () => {
    render(
      <Main>
        <p>Test Child Content</p>
      </Main>
    );

    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass("main");
  });

  it("should match the snapshot", () => {
    const { asFragment } = render(
      <Main>
        <p>Test Child Content</p>
      </Main>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
