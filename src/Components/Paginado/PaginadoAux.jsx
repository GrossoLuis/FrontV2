import ItemsCarousel from 'react-items-carousel';
import { useState } from 'react';
import p from './paginado.module.css'

export default function PaginadoAux(props){
    let aux=[]
   const [activeItemIndex, setActiveItemIndex] = useState(0);
   const chevronWidth = 1;

    for(let i=1;i<=props.max+1;i++){
        aux.push(i)
    }
   

    return( 
        <div >
            <div className={p.paginadobox}>
            <button className={p.buttonpag} onClick={()=>props.setpaginado(props.paginado-1)}>←</button>
                <div  style={{ justifyContent:'center' ,width:'60%',marginLeft:'15px',marginRight:'15px'}}>            
                <ItemsCarousel  requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={10}
                    gutter={1}
                    leftChevron={<button  className={p.buttonpag} >{'<'}</button>}
                    rightChevron={<button  className={p.buttonpag} >{'>'}</button>}
                    outsideChevron
                    chevronWidth={chevronWidth}>

                {aux.map(e=>{
                    return <button className={p.buttonpag}  key={e}  onClick={()=>props.setpaginado(e-1)}
                    style={{background:e===props.paginado+1&&'CadetBlue'}}>{e}</button>
                })}
           
                </ItemsCarousel>
                </div>   
            <button className={p.buttonpag} onClick={()=>props.setpaginado(props.paginado+1)}>→</button>
            </div>
        <button className={p.currentp}>
           Pagina {props.paginado+1}    
        </button>    
        </div>

    )
}
