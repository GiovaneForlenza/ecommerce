import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
import { getProductById } from "../data/products";
import { get } from "react-hook-form";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(productId) {
    // Check if the product is already in the cart
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      // If the product is already in the cart, increase its quantity
      setCartItems(
        cartItems.map((item) =>
          // If the item matches the productId, update its quantity, otherwise keep it unchanged
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }

    console.log(cartItems);
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
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  }

  // Remove an item from the cart based on its product ID
  function removeItemFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }

  // Calculate the total price of all items in the cart by summing the product of price and quantity for each item
  function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total +(product ? product.price * item.quantity : 0);
    }, 0);
    return total;
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
