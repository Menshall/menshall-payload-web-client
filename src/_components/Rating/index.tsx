import React, { useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const StarRating = ({
  totalStars = 5,
  rating,
  onSelect,
  size = 25,
}: {
  totalStars?: number;
  rating: number;
  onSelect?: (mark: number) => void;
  size?: number;
}) => {
  const [hover, setHover] = useState(0);

  const getColor = (index: number) => {
    if (!onSelect || rating >= index) {
      return "#FCA311";
    }
    return hover >= index ? "#FCA311" : "#fef5e7";
  };

  return (
    <div className={classNames(styles.rating, size === 14 ? styles.small : "")}>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            {onSelect && (
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => onSelect(ratingValue)}
              />
            )}
            <svg
              className="star"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={getColor(ratingValue)}
              onMouseEnter={() => onSelect && setHover(ratingValue)}
              onMouseLeave={() => onSelect && setHover(0)}
            >
              <path d="M12 .587l3.668 7.429 8.332 1.151-6.064 5.867 1.429 8.293L12 18.897l-7.365 4.03 1.429-8.293-6.064-5.867 8.332-1.151z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
