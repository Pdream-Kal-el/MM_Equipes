import "./ListaSuspensa.css"
/* vamos usar o map pra manipular o array, para cada instancia e ele manipula, diferente do foreach ele cria uma nova array */
const ListaSuspensa=(props)=>{
    return(
        <div className="ListaSuspensa">
            <label>
                {props.label}
            </label>
            <select onChange={evento=>props.aoAlterado(evento.target.value)} required={props.obrigatorio} value={props.valor}>
                    <option value=''></option>
                    {props.itens.map(item=>{
                        return <option key={item}>{item}</option>
                    })}
            </select>
        </div>
    )
}
export default ListaSuspensa