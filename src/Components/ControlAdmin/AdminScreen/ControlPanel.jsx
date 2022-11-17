
import { useState } from "react"
import ProductsForm from '../AdminComponets/ProductsForms'
import CategoryForm from "../AdminComponets/CategoryForms"
import s from "../AdminComponets/createProductScreen.module.css"
import UsersForm from "../AdminComponets/UsersForms"

export default function ControlPanel(){
    const[localState,setlocalState]=useState({
        createCategory:false,
        deleteCategory:false,
        upDateCategory:false,
        createProduct:false,
        deleteProduct:false,
        upDateProduct:false,
        product:false,
        category:false,
        users:false,

    })

    return(
        <div className={s.fullSize}> 
        <div className={s.divButtons}>
            <button className={s.button} onClick={()=>{
                    setlocalState({['product']:!localState.product})
                }  }>Product Menu</button>
            <button className={s.button} onClick={()=>{
                    setlocalState({['category']:!localState.category})
                }  }>Category menu</button>
              <button className={s.button}onClick={()=>{
                            setlocalState({['users']:!localState.users})
                        }  }>Users menu</button>    
        </div>              
            {localState.product&&<ProductsForm/>}
            {localState.category&&<CategoryForm/>}    
            {localState.users&&<UsersForm/>}
        
        </div>   
    )
}
