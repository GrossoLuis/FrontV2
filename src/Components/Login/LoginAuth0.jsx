import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import FormUser from '../Users/FormUser'
import HistoryPurchase from '../HistoryView/HistoryPurchase';
import './login.css';


export default function LoginAuth0() {
  const { user, logout} = useAuth0();


  return (
    <div className='container-index'>

      <div className="container-LoginAuth0">
        <img src={user?.picture} alt={user?.name} />
        <h2 className='title'>{user?.name}</h2>
       
        <FormUser />
       
        <button className='btnLogout' onClick={logout} >Log out</button>
      </div>
      
      
      <h2 className='title'>This your history purchase</h2>
      <div className="container-history">
        <HistoryPurchase />
      </div>

    </div>
  );
};
