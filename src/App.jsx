import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import AuthProvider from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import OrderSummary from "./pages/OrderSummary";

function App() {
  return (
    // Wraps the entire app in the AuthProvider (Custom context provider)to provide authentication context to all components
    <AuthProvider>
      {/* Wraps the entire app in the CartProvider (Custom context provider)to provide cart context to all components */}
      <CartProvider>
        <div className="app">
          <Navbar />
          {/* Used to handle different pages routing within the website */}
          <Routes>
            {/* Defines which page will be displayed for each route */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Route for product details page. Uses :id to capture the product ID from the URL */}
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/order-summary" element={<OrderSummary />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
