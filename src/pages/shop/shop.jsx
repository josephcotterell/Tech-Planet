import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import "../shop-context"

export const Shop = () => {
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>TechPlanet</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};