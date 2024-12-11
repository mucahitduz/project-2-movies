import { render, screen, fireEvent } from "@testing-library/react";
import StarRating from "./StarRating";
import "@testing-library/jest-dom";

describe("StarRating Component", () => {
  const mockOnSetRating = jest.fn();

  it("should render the correct number of stars based on maxRating", () => {
    render(
      <StarRating
        maxRating={5}
        color="#fcc419"
        size={48}
        onSetRating={mockOnSetRating}
      />
    );

    const stars = screen.getAllByRole("button");
    expect(stars).toHaveLength(5);
  });

  it("should show the correct rating when hovering over a star", () => {
    render(
      <StarRating
        maxRating={5}
        color="#fcc419"
        size={48}
        onSetRating={mockOnSetRating}
      />
    );

    const star = screen.getAllByRole("button")[2];
    fireEvent.mouseEnter(star);
    expect(screen.getByText("3")).toBeInTheDocument();

    fireEvent.mouseLeave(star);
    expect(screen.queryByText("3")).not.toBeInTheDocument();
  });

  it("should update the rating when a star is clicked", () => {
    render(
      <StarRating
        maxRating={5}
        color="#fcc419"
        size={48}
        onSetRating={mockOnSetRating}
      />
    );

    const star = screen.getAllByRole("button")[2];
    fireEvent.click(star);

    expect(mockOnSetRating).toHaveBeenCalledTimes(1);
    expect(mockOnSetRating).toHaveBeenCalledWith(3);
  });
});
