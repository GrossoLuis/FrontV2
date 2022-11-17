import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import s from "./carrito.module.css";
import {clearCart, deleteOrder, postAllOrders} from "../../Redux/actionsCarrito";
import { messageError } from "../Herramientas/MessageBox";
import { useAuth0 } from '@auth0/auth0-react';

export default function Carrito() {
  const navigate = useNavigate()
  const inCart = useSelector((state) => state.inCart);
  const userActive=useSelector(state=>state.userActive)
  const dispatch = useDispatch();
  const {isAuthenticated, loginWithRedirect, user} = useAuth0();
 
  function handleOnClick(e){
    e.preventDefault();
    if (isAuthenticated) {
      if (userActive[0].user.address && userActive[0].user.address.length > 0) {
        dispatch(postAllOrders({ user: user.email}));
        setTimeout(() => {
          return navigate(`/checkout`);
        }, 1000);
      } else {
      return messageError("Please set delivery address in your Profile")
      }
    } else {
  return loginWithRedirect();}
  }


  const handleOnRemove = () => {
    if(isAuthenticated){
      inCart?.map((e) => {
        
        return dispatch(deleteOrder(e.orders[0].id))
      })
    } else {
      dispatch(clearCart())
    };
  }


  return (
    
    <div className={s.boxcarrito}>
      <div className={s.buttonContainer}>
      <Link to="/search">
        <button className={s.btnvolver}>Volver</button>
      </Link>
      
      <button  className={s.vaciarCarrito} onClick={() => handleOnRemove()}>
          {" "}
          Clear Cart 🛒
        </button>
      </div>
      {(inCart && !inCart.error) ?
      <>
      <div className={s.grid}>
      {inCart?.map((e) => (
          <Product products={e} key={e.id}/>
      ))}
      </div>
      
      <button className={s.btnvolver} onClick={(e) => handleOnClick(e)}>
      {"Checkout"}
      </button>

      
      </>
       : 
        <h2>Cart is empty</h2>
      
      }
    </div>
    
  );
}
