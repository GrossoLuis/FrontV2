import React from "react";
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import f from './footer.module.css'

const Footer = () => {
  return (
      <div className={f.formbox}>
      <div className={f.iconsform}>
        <FaTwitter style={{ color: "white", fontSize: "40px"}}/>
        <FaInstagram style={{ color: "white", fontSize: "40px"}}/>
        <FaFacebookSquare style={{ color: "white", fontSize: "40px"}} />
      </div>
      
      <div className={f.lista}>
        <ul>
         <Link to="/"><li>Home</li></Link> 
         <Link to="/search"><li>Products</li></Link> 
         <Link to="/login"><li>Login</li></Link> 
        </ul>
          <ul> 
          <li>About us</li>
          <li>Community</li>  
          <li>Legal Politicy  </li>
          </ul>
      </div>

      </div>
  );
};

export default Footer;
