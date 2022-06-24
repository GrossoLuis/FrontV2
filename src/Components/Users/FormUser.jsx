import { useDispatch } from "react-redux"
import { useState } from "react"
import { useSelector } from "react-redux"
import { upDateProfileUser } from "../../Redux/actions"
import { messageSuccess } from "../Herramientas/MessageBox";
import '../Login/login.css'

export default function(){
    const userActive=useSelector(state=>state.userActive)
    const[userData,setuserData]=useState({

        email:userActive[0].user?userActive[0].user.email:'',
        first_name:userActive[0].user?userActive[0].user.first_name:'',
        last_name:userActive[0].user?userActive[0].user.last_name:'',
        address:userActive[0].user?userActive[0].user.address:'',
        phone:userActive[0].user?userActive[0].user.phone:'',
        postal_code:userActive[0].user?userActive[0].user.postal_code:'',
        shoppingCars:userActive[0].user.shoppingCars?userActive[0].user.shoppingCars:'',
    })
    const dispatch=useDispatch()

    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        name==='first_name'&&setuserData({...userData,['first_name']:value})    
        name==='last_name'&&setuserData({...userData,['last_name']:value})    
        name==='address'&&setuserData({...userData,['address']:value})
        name==='phone'&&setuserData({...userData,['phone']:value})
        name==='postal_code'&&setuserData({...userData,['postal_code']:value})
    }

    function handleOnClick(e){
        e.preventDefault(e)
        dispatch(upDateProfileUser(userData.email,userData))
        messageSuccess(`Your profile has been updated`)
    }

    return(
        <>
         
            <h2 className='title'>Edit your profile</h2>
            <form action=""autoComplete="off">
            <div className="divForm">
                <label htmlFor="">First name</label>
                <input type="text" name='first_name' value={userData.first_name||''}
                onChange={(e)=>{handleOnChange(e)}} />
            </div>
            <div className="divForm">
                <label htmlFor="">Last name</label>
                <input type="text" name='last_name'value={userData.last_name||''}
                onChange={(e)=>{handleOnChange(e)}}/>
            </div>
            <div className="divForm">
                <label htmlFor="">Address</label>
                <input type="text" name='address'value={userData.address||''}
                onChange={(e)=>{handleOnChange(e)}}/>
            </div>
            <div className="divForm">
                <label htmlFor="">Phone</label>
                <input type="number" name='phone'value={userData.phone||''}
                onChange={(e)=>{handleOnChange(e)}}/>
            </div>
            <div className="divForm">
                <label htmlFor="">Postal code</label>
                <input type="number" name='postal_code'value={userData.postal_code||''}
                onChange={(e)=>{handleOnChange(e)}}/>
            </div>

            </form>
            <div>
                <button className='btnBlue' onClick={(e)=>handleOnClick(e)}>Submit changes</button>
            </div>
        </>
    )
}
