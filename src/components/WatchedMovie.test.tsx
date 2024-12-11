import { render, screen, fireEvent } from '@testing-library/react';
import WatchedMovie from './WatchedMovie';
import '@testing-library/jest-dom';

describe('WatchedMovie Component', () => {
  const mockMovie = {
    imdbId: '12345',
    title: 'Mock Movie',
    year: '2023',
    poster: 'mock-poster.jpg',
    imdbRating: 8.5,
    runtime: '120',
    userRating: 9,
  };

  const mockHandleDeleteWatchedMovie = jest.fn();

  it('should call handleDeleteWatchedMovie when the delete button is clicked', () => {
    render(
      <WatchedMovie
        movie={mockMovie}
        handleDeleteWatchedMovie={mockHandleDeleteWatchedMovie}
      />,
    );
    const deleteButton = screen.getByRole('button', { name: /x/i });

    fireEvent.click(deleteButton);

    expect(mockHandleDeleteWatchedMovie).toHaveBeenCalledWith('12345');
    expect(mockHandleDeleteWatchedMovie).toHaveBeenCalledTimes(1);
  });

  it('should render the movie poster image', () => {
    render(
      <WatchedMovie
        movie={mockMovie}
        handleDeleteWatchedMovie={mockHandleDeleteWatchedMovie}
      />,
    );

    const img = screen.getByAltText('Mock Movie poster');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'mock-poster.jpg');
  });
});
