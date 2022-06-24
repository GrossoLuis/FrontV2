import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPayId } from '../../Redux/actions'
import {useNavigate} from 'react-router-dom'
import '../Login/login.css'
import s from '../Mercadopago/preview.module.css'

export default function HistoryPurchase() {

    const userActive = useSelector((state) => state.userActive)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function getHistoryWiew(payment_id) {
        dispatch(getPayId(payment_id))
        navigate('/historyPurchase')
    }

    return (
        <>
            {userActive[0].user?.shoppingCars
                ? <>
            
            {userActive[0].user.shoppingCars?.map((car) => {
                return (
                    <div className={s.containerDiv} key={car.payment_id}>
                        <p>Status: <strong>{car.status}</strong></p>
                        <p>Order Nº: <strong>{ car.payment_id}</strong></p>
                        <p>Payment type: <strong>{ car.payment_type}</strong></p>
                        <p>Date: <strong>{car.updatedAt.slice(0, 10)}</strong></p>
                        <button className='btnBlue'
                            onClick={() => getHistoryWiew(car.payment_id)}>
                            Details
                        </button>
                </div>
            )
        })}
      </>
                : <div className="container-LoginAuth0">
                   <h2 className='title'>You have no purchase...</h2>
                </div>
        }
        
        </>
  )
}
