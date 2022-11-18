import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_URL || 'https://eightrookieback.onrender.com';

ReactDOM.render(
  <Auth0Provider
    domain='therookies.us.auth0.com'
    clientId='NTitcY3q3FUJGQ67aF4yeN7llM2rbRoo'
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </Auth0Provider>,

  document.getElementById('root')
);

reportWebVitals();
