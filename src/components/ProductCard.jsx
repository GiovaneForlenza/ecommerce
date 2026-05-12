import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
        <p className="product-card-price">${product.price.toFixed(2)}</p>
        <div className="product-card-actions">
          {/* Links to product details page */}
          <Link className="btn btn-secondary" to={`/products/${product.id}`}>
            View Details
          </Link>
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
