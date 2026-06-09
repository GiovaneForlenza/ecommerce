import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getProductById } from "../data/products";
import {
  getProductReviewsWithRating,
  getReviewsByProductId,
} from "../data/reviews";
import { getUserById } from "../data/users";
import ProductReview from "./ProductReview";
import ProductReviewValueFilter from "./ProductReviewValueFilter";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [reviews, setReviews] = useState([]);

  const [activeRatingFilter, setActiveRatingFilter] = useState(0);
  // const [commentCount, setCommentCount] = useState(0);
  let commentCount = 0;
  // Fetch product details when component mounts or when id changes
  useEffect(() => {
    // Get product by ID from the data source using the provided function
    const foundProduct = getProductById(id);
    if (!foundProduct) {
      navigate("/"); // Redirect to home page if product not found
      return;
    }
    setProduct(foundProduct);
    setReviews(getReviewsByProductId(id));
    // When the product id changes, the effect will run again to fetch the new product details
  }, [id]);
  const productInCart = product
    ? cartItems.find((item) => item.id === product.id)
    : 0;

  return (
    <div className="page">
      <div className="container product-container">
        <div className="product-detail">
          <div className="product-detail-image">
            {/* Product image. Uses ? to only display if product exists */}
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="product-detail-content">
            {/* Product name. Uses ? to only display if product exists */}
            <h1 className="product-detail-name">{product?.name}</h1>
            {/* Product description. Uses ? to only display if product exists */}
            <p className="product-detail-description">{product?.description}</p>
            <span className="product-detail-rating">
              {product?.rating}
              <span className="product-star-rating">{product?.starRating}</span>
              ({product?.reviews})
            </span>
            <p className="product-detail-price">
              {/* Product price. Uses ? to only display if product exists */}
              Price: ${product?.price.toFixed(2)}
            </p>
            <button
              className="btn btn-primary btn-large"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart {productInCart ? ` (${productInCart.quantity})` : ""}
            </button>
          </div>
        </div>
        <div className="product-rating-container">
          <div className="product-rating-filters">
            <h2>Customers Reviews</h2>
            <div className="product-card-rating">
              <span className="product-star-rating">{product?.starRating}</span>
              {product?.rating} out of 5
            </div>
            <div className="product-rating-values">
              <div
                className={`product-details-rating-value ${activeRatingFilter === 0 && "active-filter"}`}
                onClick={() => {
                  setReviews(getReviewsByProductId(product?.id));
                  setActiveRatingFilter(0);
                }}
              >
                {`All - ${product?.reviews} reviews`}
              </div>
              {Array.from({ length: 5 }, (_, i) => (
                <ProductReviewValueFilter
                  productId={product?.id}
                  rating={5 - i}
                  setReviews={setReviews}
                  activeRatingFilter={activeRatingFilter}
                  setActiveRatingFilter={setActiveRatingFilter}
                />
              ))}
            </div>
          </div>
          <div className="product-ratings-list">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => {
                const user = getUserById(review.userId);
                commentCount++;
                return (
                  <ProductReview
                    review={review}
                    user={user}
                    commentCount={commentCount}
                    key={review.id}
                    product={product}
                  />
                );
              })
            ) : (
              <div className="product-ratings-no-reviews">{`There are no ${activeRatingFilter}-star reviews at this moment`}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
