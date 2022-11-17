import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react';
import ControlPanel from './Components/ControlAdmin/AdminScreen/ControlPanel';
import Landing from './Components/Landing/Landing';
import LoginAuth0 from './Components/Login/LoginAuth0';
import NavBar from './Components/NavBar/NavBar';
import ProductDetail from './Components/ProductDetail/productDetail';
import Category from './Components/Category/Category';
import Carrito from './Components/Carrito/Carrito';
import PurchasePage from './Components/PurchasePage/PurchasePage';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch , useSelector } from 'react-redux';
import { postOrder, getOrder } from './Redux/actionsCarrito';
import FormUser from './Components/Users/FormUser';
import Preview from './Components/Mercadopago/Preview';
import HistoryDetailsView from './Components/HistoryView/HistoryDetailsView';
import { findOrCreateUser } from './Redux/actions';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  let { isAuthenticated, user } = useAuth0();
  const userActive = useSelector((state) => state.userActive);
  const dispatch = useDispatch();
  const inCart = useSelector((state) => state.inCart);
  const resPostOrder = useSelector((state) => state.postOrder);
  
  useMemo(() => {
    if (isAuthenticated && userActive.length > 0) {
      const cart = window.localStorage.getItem("cartItems");

    if(cart){
      var parsedCart = JSON.parse(cart);
      parsedCart.map((el) => 
        dispatch(postOrder({...el, amount: el.quantity, email:user.email, productId: el.id, status: "inCart"}))
       
      );
      localStorage.removeItem("cartItems")
      }
    }
  }
  ,[isAuthenticated, userActive])

  useEffect(() => {
    if(isAuthenticated && userActive.length > 0){

      dispatch(getOrder({ status: 'inCart', user: user.email }))

    }
    if(userActive[0]==='banned'){isAuthenticated=false}
   
    if (isAuthenticated && !userActive.length) {
      dispatch(findOrCreateUser({
        email: user.email,
        first_name: user.given_name || user.nickname,
        last_name: user.family_name || undefined,
        image: user.picture,
        

      }));
    }

  }, [isAuthenticated, userActive, resPostOrder]);

  return (
    <div>

      <NavBar inCart={inCart} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path={`/search`} element={<Category />} />
        <Route path={`/checkout`} element={<PurchasePage />} />
        <Route path={`/purchase/:purchaseId`} element={<Preview />} />
        <Route path='/historyPurchase' element={<HistoryDetailsView />} />
        <Route exact path='/admin/controlpanel' element={<ControlPanel />} />
        <Route exact path='/edit/profile' element={<FormUser />} />
        <Route exact path='/products/carrito' element={<Carrito />} />
      </Routes>
      <ToastContainer />
      <Footer />

    </div>
  );
}

export default App;
