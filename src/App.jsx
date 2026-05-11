import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    // Wraps the entire app in the AuthProvider (Custom context provider)to provide authentication context to all components
    <AuthProvider>
      <div className="app">
        <Navbar />
        {/* Used to handle different pages routing within the website */}
        <Routes>
          {/* Defines which page will be displayed for each route */}
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
