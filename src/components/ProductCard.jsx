import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  // Check if the product is already in the cart to display the quantity next to the "Add to cart" button
  const productInCart = cartItems.find((item) => item.id === product.id);

  return (
    <div className="product-card">
      {/* Link to product details page */}
      <Link to={`/products/${product.id}`} className="product-card-link">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
      </Link>
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-price-rating">
          <p className="product-card-price">${product.price.toFixed(2)}</p>
          <span className="product-card-rating">
            {product.rating}
            <span className="product-star-rating">{product.starRating}</span>(
            {product.comments})
          </span>
        </div>
        <div className="product-card-actions">
          {/* Links to product details page */}
          <button
            className="btn btn-primary btn-large"
            onClick={() => addToCart(product.id)}
          >
            {/* If the product is already in the cart display its quantity after the label */}
            Add to cart{productInCart ? ` (${productInCart.quantity})` : ""}
          </button>
          <Link className="btn btn-secondary" to={`/products/${product.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
