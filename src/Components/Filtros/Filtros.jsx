import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux"
import f from './filtros.module.css'
import { filtrarPorPrecio, filtroPorCategory,vaciarRespuesta,actualizar } from "../../Redux/actions"

export default function Filtros(props){

    const dispatch=useDispatch()
    
    const todasLasCategorias=useSelector(state=>state.Category)
    const Respuesta=useSelector(state=>state.Respuesta)
    const[localState,setlocalState]=useState({
        price:'',
        category:''
    })


    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        if(name==='category'){

            setlocalState({['price']:''})
            setlocalState({['category']:value})
            dispatch(actualizar(props.Allproduct))
        }

        if(name==='precio'){
            if(Respuesta.length>0){dispatch(vaciarRespuesta())}
                 setlocalState({['price']:value})
        }

    }
    function handleOnClick(e){
        e.preventDefault(e)
       
        dispatch(filtrarPorPrecio(props.arrObj,props.arrObjAux,localState.price))
    }
    function handleOnCategory(e){
        e.preventDefault(e)
        if(localState.category==='todos'){
            dispatch(actualizar(props.Allproduct))

        } else {
            
            dispatch(filtroPorCategory(props.arrObj,props.arrObjAux,localState.category))
            
        }
}
    return(
        <div className={f.filtrosbox}>

            <select className={f.selectest} name="category" id="" onChange={(e)=>{handleOnChange(e)}}>
                <option value={'todos'}>All Products</option>
            {todasLasCategorias.length>0&&todasLasCategorias.map((e,i)=>{
                
                return <option key={i} value={e.id}>{e.name}</option>
            })}
            </select>
            <button className={f.buttonF} onClick={(e)=>handleOnCategory(e)} >Filter</button>

            <input type="number" name="precio" placeholder="precio"
                     onChange={(e)=>handleOnChange(e)}  />
            <button className={f.buttonS} onClick={(e)=>{handleOnClick(e)}}>Search</button>        
        </div>
    )
}
