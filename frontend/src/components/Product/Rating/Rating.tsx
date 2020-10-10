import React from "react";

interface RatingProps {
  value: number;
  text: string;
}

const Rating: React.FC<RatingProps> = ({ value, text }) => {
  const mapValueToArray = (rating: number): number[] => {
    let star = [];
    for (let i = 1; i < 6; i++) {
      if (i < rating) {
        star.push(1);
      } else {
        if (i - 0.5 < rating) {
          star.push(0.5);
        } else {
          star.push(0);
        }
      }
    }
    return star;
  };

  return (
    <div className="rating">
      {mapValueToArray(value).map((rating: number) => {
        if (rating === 1) {
          return (
            <span>
              <i className="fas fa-star" />
            </span>
          );
        } else if (rating === 0.5) {
          return (
            <span>
              <i className="fas fa-star-half-alt" />
            </span>
          );
        } else {
          return (
            <span>
              <i className="far fa-star" />
            </span>
          );
        }
      })}
    </div>
  );
};

export default Rating;
