import React  from 'react'
import { useSelector } from 'react-redux'
import HistoryCard from './HistoryCard';
import a from "./historyCard.module.css";
import logo from '../../assets/8Rookies.png';
import {FcPaid} from 'react-icons/fc';

export default function HistoryDetailsView() {

    const paymentDetails = useSelector((state) => state.paymentDetails)

  return (
      <div className={a.allContainer}>
          <div className={a.divContainer}>
          <div className={a.imgContainer}>
            <FcPaid className={a.logo}/>
            <img className={a.logo} src={logo} alt="The rookies" />
          </div>
          
          <h1>Status: {paymentDetails?.status} </h1>
          <p>Date approved: {paymentDetails?.date?.slice(0, 10)} </p>
          
          </div>
          <div className={a.displayFlex}> {paymentDetails?.products?.map((p) => {
              return (
              
                    <HistoryCard 
                    products={
                      {name: p.title,
                      amount: p.quantity,
                      price: p.unit_price}
                    }
                    key={p.title}
                    />
              )
          })} </div>
    </div>
  )
}
