import React from "react";

function ProductReview({ review, user, commentCount, product }) {
  return (
    <div className="product-rating-comment">
      <div className="product-rating-comment-header">
        <img src={user.photo} alt="User photo" />
        <div className="product-rating-comment-header-info">
          <h3 className="product-rating-comment-user-name">{user.name}</h3>
          <span className="product-star-rating">{review.starRating}</span>
        </div>
      </div>
      <div className="product-rating-comment-content">{review.comment}</div>
      {commentCount < product?.reviews && (
      <div className="product-rating-comment-line"></div>
      )}
    </div>
  );
}

export default ProductReview;
