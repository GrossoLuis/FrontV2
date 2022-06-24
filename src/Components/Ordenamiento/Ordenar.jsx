import { useDispatch } from "react-redux"
import { ordenar } from "../../Redux/actions"
import o from './ordenar.module.css'



export default function Ordenar(props){
    const dispatch=useDispatch()

    return(
        <div className={o.filtrosbox}>
            <button className={o.buttonor} onClick={()=>
                dispatch(ordenar(props.arrObj,props.arrObjAux,'name',false))}
            >A-z</button>
            <button className={o.buttonor} onClick={()=>
                dispatch(ordenar(props.arrObj,props.arrObjAux,'name',true))}
                >Z-a</button>
            <button className={o.buttonor} onClick={()=>
                dispatch(ordenar(props.arrObj,props.arrObjAux,'price',true))}
                >Price-Mayor-menor</button>
            <button className={o.buttonor} onClick={()=>
                dispatch(ordenar(props.arrObj,props.arrObjAux,'price',false))}
                >Price-Menor-mayor</button>
        </div>
    )
}
