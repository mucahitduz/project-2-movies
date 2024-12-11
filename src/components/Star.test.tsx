import { render, screen, fireEvent } from '@testing-library/react';
import Star from './Star';
import '@testing-library/jest-dom';

describe('Star Component', () => {
  const mockOnRate = jest.fn();
  const mockOnHoverStart = jest.fn();
  const mockOnHoverEnd = jest.fn();

  it('should render correctly with given props', () => {
    render(
      <Star
        full={true}
        color="gold"
        size={24}
        onRate={mockOnRate}
        onHoverStart={mockOnHoverStart}
        onHoverEnd={mockOnHoverEnd}
      />,
    );

    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('fill', 'gold');
    expect(svg).toHaveAttribute('stroke', 'gold');
    expect(screen.getByRole('button')).toHaveStyle('width: 24px; height: 24px');
  });

  it('should call onHoverStart when mouse enters', () => {
    render(
      <Star
        full={true}
        color="gold"
        size={24}
        onRate={mockOnRate}
        onHoverStart={mockOnHoverStart}
        onHoverEnd={mockOnHoverEnd}
      />,
    );

    const star = screen.getByRole('button');
    fireEvent.mouseEnter(star);
    expect(mockOnHoverStart).toHaveBeenCalledTimes(1);
  });

  it('should call onHoverEnd when mouse leaves', () => {
    render(
      <Star
        full={true}
        color="gold"
        size={24}
        onRate={mockOnRate}
        onHoverStart={mockOnHoverStart}
        onHoverEnd={mockOnHoverEnd}
      />,
    );

    const star = screen.getByRole('button');
    fireEvent.mouseLeave(star);
    expect(mockOnHoverEnd).toHaveBeenCalledTimes(1);
  });

  it('should call onRate when clicked', () => {
    render(
      <Star
        full={true}
        color="gold"
        size={24}
        onRate={mockOnRate}
        onHoverStart={mockOnHoverStart}
        onHoverEnd={mockOnHoverEnd}
      />,
    );

    const star = screen.getByRole('button');
    fireEvent.click(star);
    expect(mockOnRate).toHaveBeenCalledTimes(1);
  });

  it('should render an empty star when full is false', () => {
    render(
      <Star
        full={false}
        color="gray"
        size={24}
        onRate={mockOnRate}
        onHoverStart={mockOnHoverStart}
        onHoverEnd={mockOnHoverEnd}
      />,
    );

    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'gray');
  });
});
