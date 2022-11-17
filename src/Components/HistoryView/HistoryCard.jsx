import React from 'react';
import a from "./historyCard.module.css";
import {BsFillImageFill} from 'react-icons/bs';



export default function Product(props) {
  const { products } = props;
  
  return (
    <div className={a.cardContainer}>
        <div className={a.pictureContainer}> <BsFillImageFill className={a.picture}  />
        <h2 className={a.padding}>
          {products.name.replace(/[#-]/g, " ")}
        </h2>
        </div>
        
      
        
    <div className={a.detailContainer}><h4 className={a.padding}>Quantity:{" "} {products.amount && products.amount}</h4></div>
      
      <h4 className={a.padding}>Price:{" "} ${products.price}</h4>
      <h5 className={a.padding}>Total price:{" "} ${products.amount * products.price}</h5>
    </div>
  )
}
