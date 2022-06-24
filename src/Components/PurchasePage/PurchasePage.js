import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrder } from '../../Redux/actionsCarrito';
import { useAuth0 } from '@auth0/auth0-react';
import s from './purchasePage.module.css'

export default function PurchasePage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const {isAuthenticated, user} = useAuth0();
    const inPending = useSelector((state) => state.inCart);
    const resPutOrder = useSelector((state) => state.resPutOrder);
    const resDelete = useSelector((state) => state.deleted);
  const [url, setUrl] = useState('');
  
    useEffect(() => {
        if(isAuthenticated){
      dispatch(getOrder({ status: 'inCart', user: user.email }))
    }
    }, [resDelete, location.search, isAuthenticated]);

    useEffect(() => {
        // Transformo inPending en item para Mercado Pago
        let item = []
        if (inPending && !inPending.error) {
        item = inPending.map((e) => {
            return {
                title: e.name,
                quantity: e.orders[0].amount,
                price: e.price
            }
        });

        //Hago el Post de MercadoPago
          axios.post('/mercadopay', {
            carrito: item,
            userEmail: user.email
          }).then((r) => {
            if (r) {
              setUrl(r.data.url);
              }
           }).catch((err) => console.error(err));
        }
        if(url && url.length){
          return navigate(window.location.href = `${url}`);
        }

    },[inPending, resDelete, resPutOrder, url])

return (
    <div className={s.size}>
    <h1> Redirecting to MercadoPago... </h1>
    </div>
    );
}
