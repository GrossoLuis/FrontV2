import React from 'react';
import { Link } from "react-router-dom";
import a from "./previewCard.module.css";

export default function Product(props) {
  const { products } = props;
  
  return (
    <div className={a.cardContainer}>

        <Link to={`/products/${products.id}`}>
          <img
            src={products.image}
            alt={products.name}
            width="100px"
            height="150px"
          />
        </Link>


      <Link to={`/products/${products.id}`}>
        <h2>
          {products.name.replace(/[#-]/g, " ")}
        </h2>
      </Link>
      <h4>Quantity:{" "} {products.orders && products.orders[0].amount}</h4>
      <h4>Price:{" "} ${products.price}</h4>
      <h5>Total ${products.orders[0].amount * products.price}</h5>
    </div>
  )
}
