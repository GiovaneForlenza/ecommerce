import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

function Checkout() {
  // Importing necessary functions and data from the CartContext
  const {
    getCartItemsWithProducts,
    removeItemFromCart,
    updateQuantity,
    getCartTotal,
    completeCheckout,
  } = useCart();

  // Getting the cart items with their corresponding product details and the total amount
  const cartItems = getCartItemsWithProducts();
  const totalAmount = getCartTotal();

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {cartItems.length === 0 && (
              <p className="checkout-empty-message">
                Your cart is empty.
              </p>
            )}
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <Link
                  to={`/products/${item.product.id}`}
                  className="checkout-item-details"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="checkout-item-image"
                  />
                  <div className="">
                    <h3 className="checkout-item-name">{item.product.name}</h3>
                    <p className="checkout-item-quantity">
                      Quantity: {item.quantity}
                    </p>
                    <p className="checkout-item-price">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                </Link>
                <div className="checkout-item-controls">
                  <div className="quantity-controls">
                    <div
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </div>
                    <div className="quantity-display">{item.quantity}</div>
                    <div
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </div>
                  </div>
                  <p className="checkout-item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-summary">
            <h2 className="checkout-section-title">Total</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value checkout-total-final">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            {cartItems.length > 0 && (
              <button
                className="btn btn-primary btn-large btn-block"
                onClick={completeCheckout}
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
