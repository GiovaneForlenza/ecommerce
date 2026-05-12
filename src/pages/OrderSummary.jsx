import React from "react";
import { useCart } from "../contexts/CartContext";

import { getProductById } from "../data/products";

function OrderSummary() {
  const { getCheckedOutTotal, completeCheckout } = useCart();
  const checkedOutItemsIds = localStorage.getItem("lastPurchase")
    ? JSON.parse(localStorage.getItem("lastPurchase"))
        .map((item) => ({
          ...item,
          product: getProductById(item.id),
        }))
        .filter((item) => item.product) // Filter out items that don't have a corresponding product
    : [];

  const totalAmount = getCheckedOutTotal();
  return (
    <div className="page">
      <div className="container">
        <div className="page-title">
          <h1>Thank you for your purchase!</h1>
        </div>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
            {checkedOutItemsIds ? (
              checkedOutItemsIds.map((item) => (
                <div key={item.id} className="checkout-item">
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
                    <p className="checkout-item-total">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items purchased.</p>
            )}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
