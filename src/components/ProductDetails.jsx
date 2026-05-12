import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../contexts/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  // Fetch product details when component mounts or when id changes
  useEffect(() => {
    // Get product by ID from the data source using the provided function
    const foundProduct = getProductById(id);
    if (!foundProduct) {
      navigate("/"); // Redirect to home page if product not found
      return;
    }
    setProduct(foundProduct);

    // When the product id changes, the effect will run again to fetch the new product details
  }, [id]);
  const productInCart = product
    ? cartItems.find((item) => item.id === product.id)
    : 0;
  return (
    <div className="page">
      <div className="container">
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
            <p className="product-detail-price">
              {/* Product price. Uses ? to only display if product exists */}
              Price: ${product?.price.toFixed(2)}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart {productInCart ? ` (${productInCart.quantity})` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
