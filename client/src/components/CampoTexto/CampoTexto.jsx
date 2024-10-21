import { useState } from 'react'
import './CampoTexto.css'
const CampoTexto =(props)=>{
    const Placeholder=`${props.placeholder}`
    //em vez de usar let, nos vamos usar um gancho
    //let valor=''
    //const [valor, setValor]=useState('')
    const aoDigitado=(evento)=>{
        //setValor(evento.target.value)
        //console.log(valor)
        props.aoAlterado(evento.target.value)
    }
    return(
        <div className='Campo-Texto'>
            <label>{props.label}</label>
            <input value={props.valor} onChange={aoDigitado} required={props.obrigatorio} placeholder={Placeholder}/>
        </div>
    )
}
export default CampoTexto