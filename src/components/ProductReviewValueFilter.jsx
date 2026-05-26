import React from "react";
import {
  getProductCountWithRating,
  getProductReviewsWithRating,
} from "../data/reviews";

function ProductReviewValueFilter({
  productId,
  rating,
  setReviews,
  activeRatingFilter,
  setActiveRatingFilter,
}) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <span className="stars">
        {"★".repeat(fullStars)}
        {halfStar && "⯪"}
        {"☆".repeat(emptyStars)}
      </span>
    );
  };
  return (
    <div
      onClick={() => {
        setReviews(getProductReviewsWithRating(productId, rating));
        setActiveRatingFilter(rating);
      }}
      className={`product-details-rating-value ${activeRatingFilter === rating && "active-filter"}`}
    >
      {rating} {renderStars(rating)}{" "}
      {getProductCountWithRating(productId, rating)} reviews
    </div>
  );
}

export default ProductReviewValueFilter;
