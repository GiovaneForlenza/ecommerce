import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

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
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, {id: productId, quantity: 1 }]);
    }

    console.log(cartItems)
  }

  return (
    <CartContext.Provider value={{ addToCart, cartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
