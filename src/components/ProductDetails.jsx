import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { getProductById } from "../data/products";
import { getCommentsByProductId } from "../data/comments";
import { getUserById } from "../data/users";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [comments, setComments] = useState([]);
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
    setComments(getCommentsByProductId(id));
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
              ({product?.comments})
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
          <div className="product-rating-header">a</div>
          <div className="product-ratings-list">
            {comments &&
              comments.map((c) => {
                const user = getUserById(c.userId);
                commentCount++;
                return (
                  <div key={c.id} className="product-rating-comment">
                    <div className="product-rating-comment-header">
                      <img src={user.photo} alt="User photo" />
                      <div className="product-rating-comment-header-info">
                        <h3 className="product-rating-comment-user-name">
                          {user.name}
                        </h3>
                        <span className="product-detail-rating">
                          {/* {c.rating} */}
                        </span>
                        <span className="product-star-rating">
                          {c.starRating}
                        </span>
                      </div>
                    </div>
                    <div className="product-rating-comment-content">
                      {c.comment}
                    </div>
                    {commentCount < product?.comments && (
                      <div className="product-rating-comment-line"></div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
