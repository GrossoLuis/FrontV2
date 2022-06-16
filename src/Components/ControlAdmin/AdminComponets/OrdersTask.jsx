
import { useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getOrders, upDateOrder, vaciarRespuesta } from "../../../Redux/actions"
import s from "./createProductScreen.module.css"


export default function OrdersTask(){

    const dispatch=useDispatch()
    const AllOrders=useSelector(state=>state.AllOrders)
    const Respuesta=useSelector(state=>state.Respuesta)
   
    const[local,setlocal]=useState({
        id:'',
        status:'',
    })
    let mostraDelivery=AllOrders.length>0&&AllOrders.filter(e=>e.status==='delivery')
    let mostraFinished=AllOrders.length>0&&AllOrders.filter(e=>e.status==='finished')
    let mostraDelivered=AllOrders.length>0&&AllOrders.filter(e=>e.status==='delivered')
    useEffect(()=>{dispatch(getOrders())},[mostraDelivered.length,mostraFinished.length,mostraDelivery.length])
    // function traerOrders(){
    //     dispatch(getOrders())
    // }
    

    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        name==='finished'&&setlocal({...local,['id']:value})
        name==='delivery'&&setlocal({...local,['id']:value})
        name==='delivered'&&setlocal({...local,['id']:value})
        name==='status'&&setlocal({...local,['status']:value})
    }

    function handleOnClick(e){
        e.preventDefault(e)
        dispatch(upDateOrder(local.id,{status:local.status}))
        dispatch(vaciarRespuesta())
        dispatch(getOrders())

        console.log(local.id,local.status)
    }

    return(
        <div style={{marginTop:"60px"}}>
            <h1>Orders</h1>
            <div>
                <select name="finished" id="" onChange={(e)=>{handleOnChange(e)}}>

                    <option value="">Finished</option>
                    {mostraFinished.length>0&&mostraFinished.map((e,i)=>{
                        return <option key={i} value={e.id}>order id:{e.id} prod:{e.productId} amount:{e.amount} user:{e.user.email}</option>
                    })}
                </select>
            </div>
            <div>
                <select name="delivery" id="" onChange={(e)=>{handleOnChange(e)}}>
                    <option value="">Delivery</option>
                    {mostraDelivery.length>0&&mostraDelivery.map((e,i)=>{
                        return <option key={i} value={e.id}>order id:{e.id} prod:{e.productId} amount:{e.amount} user:{e.user.email}</option>
                    })}
                </select>
            </div>
            <div>
                <select name="delivered" id="" onChange={(e)=>{handleOnChange(e)}}>
                    <option value="">Delivered</option>
                    {mostraDelivered.length>0&&mostraDelivered.map((e,i)=>{
                        return <option key={i} value={e.id}>order id:{e.id} prod:{e.productId} amount:{e.amount} user:{e.user.email}</option>
                    })}
                    
                </select>
            </div>
            <div >
                <select name="status" id="" onChange={(e)=>{handleOnChange(e)}}>
                    <option value="">Change Status</option>
                    <option value="finished">Finished</option>
                    <option value="delivery">Delivery</option>
                    <option value="delivered">Delivered</option>
                </select>
            </div>
            <button className={s.button2}  onClick={(e)=>{handleOnClick(e)}}>Done</button>
        </div>
    )
}