import { useState } from 'react';
import '../App.css';
import Star from './Star';

interface StarRatingProps {
  maxRating: number;
  color: string;
  size: number;
  onSetRating: React.Dispatch<React.SetStateAction<number>>;
}

const StarRating = ({
  maxRating = 10,
  color = '#fcc419',
  size = 48,
  onSetRating,
}: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);

  function handleRating(rating: number) {
    setRating(rating);
    onSetRating(rating);
  }

  return (
    <div className=" container">
      <div className="star-container">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            onHoverStart={() => setRatingHover(i + 1)}
            onHoverEnd={() => setRatingHover(0)}
            full={ratingHover ? ratingHover >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p
        className="star-text"
        style={{ color: color, fontSize: `${size / 2}px` }}
      >
        {ratingHover || ''}
      </p>
    </div>
  );
};

export default StarRating;
