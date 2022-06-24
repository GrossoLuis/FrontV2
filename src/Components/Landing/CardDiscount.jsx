import React from 'react';
import { Link } from 'react-router-dom';
import './CardDiscount.css';

function CardDiscount({ image, name, id, price, discount }) {
    return (
        <div className="card">
            <img alt="" src={image} width="100px" height="100px"/>
            
            
            <div className="card-container">

                <div className="top-left"> {discount} </div>

            </div>            
            <div className="info">
                <fieldset>
                    <legend> {discount} </legend>
                    <h3 >Amazing price...</h3>
                    <p> Sale {discount} </p>

                    <h1>Total price:  {price/2}  </h1>
                    
                </fieldset>
                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <button>See more</button>
                </Link>
            
            </div>
            <h4 style={{ textAlign: "center", color: "black" }}>{name.replace(/[#-]/g, " ")}</h4>
            <del><h2 style={{color: "black"}}>${price}</h2></del>
        </div>
    );
}

export default CardDiscount;
