import { useState } from "react";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { crearCategory } from "../../../Redux/actions";
import { messageSuccess } from "../../Herramientas/MessageBox";
import s from "./createProductScreen.module.css"


export default function CategoryForm(){

    const dispatch=useDispatch()

    const[formState,setformState]=useState({
        name:'',
    })
    //algo
    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        name==='name'&&setformState({['name']:validarCadena(value,15)?value.toLocaleUpperCase():formState.name.toLocaleUpperCase()})
    }
    function handleOnClick(e){
        e.preventDefault(e)
        if(formState.name.length > 0){
        dispatch(crearCategory(formState))
        messageSuccess("Category added")
        setformState({['name']:''})}

    }
    function validarCadena(str,len){
   
    
        if(str.length>len){return false}
          
           //str=str.split('-').join('')
           //str=str.split('/').join('')
           let primero=/\W/.test(str)
           let segundo=/\d/.test(str)
           return !primero && !segundo 
     
   }
    return(
        <div className={s.display}>
            <form action=""autoComplete="off">
                <div className={s.divInput}>
                <label>Category name: </label>
                <input placeholder="enter category"type="text" name='name'onChange={(e)=>handleOnChange(e)}
                value={formState.name}/>
                </div>
                <div className={s.display}>
                <button className={s.button2} onClick={(e)=>{handleOnClick(e)}}>Add category</button>
                </div>
            </form>

        </div>
    )
}