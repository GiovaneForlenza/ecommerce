import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
import { getProductById } from "../data/products";
import { get } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    updateCartItemsList();
  }, []);

  function updateCartItemsLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  function updateCartItemsList() {
    setCartItems(
      localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    );
  }

  function addToCart(productId) {
    // Check if the product is already in the cart
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      // If the product is already in the cart, increase its quantity
      updateQuantity(productId, existingItem.quantity + 1);
    } else {
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, { id: productId, quantity: 1 }]),
      );
    }
    updateCartItemsList();
  }

  function getCartItemsWithProducts() {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product); // Filter out items that don't have a corresponding product
  }

  function updateQuantity(productId, newQuantity) {
    // If the new quantity is less than 1, remove the item from the cart
    if (newQuantity < 1) {
      removeItemFromCart(productId);
      return;
    } else {
      // Update the quantity of the item in the cart
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          cartItems.map((item) =>
            // If the item matches the productId, update its quantity, otherwise keep it unchanged
            item.id === productId ? { ...item, quantity: newQuantity } : item,
          ),
        ),
      );
    }
    updateCartItemsList();
  }

  // Remove an item from the cart based on its product ID
  function removeItemFromCart(productId) {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((item) => item.id !== productId)),
    );
    updateCartItemsList();
  }

  // Calculate the total price of all items in the cart by summing the product of price and quantity for each item
  function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
    return total;
  }

  function getCheckedOutTotal(){
    const total = localStorage.getItem("lastPurchase")
      ? JSON.parse(localStorage.getItem("lastPurchase")).reduce((total, item) => {
          const product = getProductById(item.id);
          return total + (product ? product.price * item.quantity : 0);
        }, 0)
      : 0;
    return total;
  }

  function completeCheckout() {
    localStorage.setItem("lastPurchase", JSON.stringify(cartItems));
    localStorage.setItem("cartItems", JSON.stringify([]));
    updateCartItemsList();
    navigate("/order-summary");
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        getCartItemsWithProducts,
        updateQuantity,
        removeItemFromCart,
        getCartTotal,
        getCheckedOutTotal,
        completeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
