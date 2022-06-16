import React from 'react';
import { Link } from "react-router-dom";
import s from "../../../src/Global.module.css";
import a from "./product.module.css";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { messageSuccess } from "../Herramientas/MessageBox";
import {
  addToCart,
  getOrder,
  postOrder,
  removeFromCart,
  putOrder
} from "../../Redux/actionsCarrito";
import { useAuth0 } from '@auth0/auth0-react';

export default function Product(props) {
  
  const {isAuthenticated, user} = useAuth0(); 
  const dispatch=useDispatch()
  const { products } = props;

  const updateCartHandler = async (products) => {      
    // checkeo el stock y luego
    if(isAuthenticated){
      await dispatch(postOrder({...products, amount: products.quantity, email:user.email,  productId: products.id, status: "inCart"}))
      dispatch(getOrder({ status: 'inCart', user: user.email }))
    } else {
      dispatch(addToCart(products)) // local storage
    }
    messageSuccess(`${products.name}  added to cart`)
  }

  const reduceHandler = async (products) => {      
    // checkeo el stock y luego
    if(isAuthenticated){
      await dispatch(putOrder({
        amount: -1,
        productId: products.id,
        status: "inCart",
        user: user.email})
        )
      dispatch(getOrder({ status: 'inCart', user: user.email}))
    } else {
      dispatch(removeFromCart(products))
    }
    messageSuccess(`${products.name}  removed from cart`)
  }
  
  return (
    <div className={a.cardContainer}>
      <div className={a.pictureContainer}>
      <Link to={`/products/${products.id}`} className={a.maxImg}>
       
          
      
          <img
            src={products.image}
            alt={products.name}
            className={a.maxImg}
          />
       
  
      </Link>
      </div>
      <div>
      
      <Link to={`/products/${products.id}`}>
        <h2 style={{ textAlign: "center", color: "black", fontSize:"20px" }}>
          {products.name.replace(/[#-]/g, " ")}

        </h2>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <h4 className={a.price}>${products.price}</h4>
          <button className={s.btnLand} onClick={() => updateCartHandler(products)}>
            <AiOutlineShoppingCart className={s.cartLogo} />
          </button>

          
          {(products.quantity >= 1 || products.orders) && 
          <>
          <h4 className={a.price}>{products.quantity || products.orders[0].amount}</h4>
          <button className={s.sacarBtn} onClick={() => reduceHandler(products)}>
          {"-"}
          </button>
          </>
          }

        
      </div>
          
        </div>
        <h4> In stock: {products.amount}</h4>

    </div>
  )
}
