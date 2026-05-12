import React, {useContext} from "react";

import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products";

import { AuthContext } from "../contexts/AuthContext";



function Home() {
  const products = getProducts();
  
    const { user } = useContext(AuthContext);
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">{user ? `Welcome back, ${user.email}!` : "Welcome to ShopHub"}</h1>
        <p className="home-subtitle">
          Discover amazing products at great pricing
        </p>
      </div>
      <div className="container">
        <h2 className="page-title">Our products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
