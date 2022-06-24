import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeOrderStatus, getOrder, getUserInfo } from '../../Redux/actionsCarrito';
import PreviewCard from '../PreviewCard/PreviewCard';
import { useAuth0 } from '@auth0/auth0-react';
import s from './preview.module.css'
import {FcCalendar, FcCurrencyExchange, FcHome, FcShipped} from 'react-icons/fc';
import { GiShoppingCart} from 'react-icons/gi';

export default function Preview() {
  const {purchaseId} = useParams();
  const {user, isAuthenticated} = useAuth0();
  const dispatch = useDispatch();
  const resChangeOrderStatus = useSelector((state) => state.resChangeOrderStatus);
  const inCart = useSelector((state) => state.inCart);
  const products = useSelector((state) => state.finished);
  const userActive=useSelector(state=>state.userActive)

  useEffect(() => {
    if(isAuthenticated && inCart.length > 0){
    const ordersIds = inCart.map((e) => e.orders[0].id);
    dispatch(changeOrderStatus({purchaseId: purchaseId, ordersIds: ordersIds}));
    }
  }, [ isAuthenticated, inCart]);

  useEffect(() => {
    if(isAuthenticated){
      dispatch(getOrder({ status: 'inCart', user: user.email }))
      dispatch(getOrder({status: "finished", user: user.email, purchaseId: purchaseId}))
      dispatch(getUserInfo(user.email))
    }
  }, [isAuthenticated, resChangeOrderStatus]);

const today = new Date();

  const date = today.getFullYear() + '-' + (today.getMonth() + 2) + '-' + today.getDate();

  return (
    <div>
      {resChangeOrderStatus.status === "approved" ?
      <div>
        <div>
          <h1>Your payment has result: {resChangeOrderStatus.status}</h1>
        </div>
          <div className={s.grid}>
        {products?.length &&
          products?.map((product) => {
            return (
              <PreviewCard key={product.id} products={product}/>
            );
          })}
          </div>
        <div className={s.containerDiv}>
          <h4>
          <FcHome style={{ fontSize: '40px', marginTop: "10px"}}/>
          {" "} Delivery Address: {" "}
          
            {userActive[0].user.address ? 
            userActive[0].user.address
             : (
            "Rosalia de Castro 677"
            )
          }
          </h4>
        
          {resChangeOrderStatus && resChangeOrderStatus?.fullPrice && (
            <h4>
              <GiShoppingCart style={{ fontSize: '40px', marginTop: "10px"}}/>
              Cart price: ${resChangeOrderStatus && resChangeOrderStatus.fullPrice}</h4>
          )}
          {products && products?.length > 0 && (
            <h4>
            <FcShipped style={{ fontSize: '40px', marginTop: "10px"}}/> {"   "}  
              Shipping cost: {"$200"}</h4>
          )}
          {resChangeOrderStatus && resChangeOrderStatus?.fullPrice && (
            <h4>
              <FcCurrencyExchange style={{ fontSize: '40px', marginTop: "10px"}}/> {"   "}  
              Total:{' '}
              ${Math.round((Number(resChangeOrderStatus.fullPrice) + 200) * 100) / 100}
            </h4>
          )}
        
        <h5>
        <FcCalendar style={{ fontSize: '40px', marginTop: "10px"}}/> {"   "}
        Estimated delivery date: {date}
        </h5>
        </div>
      </div>
      : <h5>Your payment is pending confirmation</h5>}
    </div>
  );
}
