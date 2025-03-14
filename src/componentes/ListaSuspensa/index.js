import './ListaSuspensa.css'

const ListaSuspensa = (props) => {
    return (
        <div className='lista-suspensa'>
            <label>{props.label}</label>
            <select disabled onChange={evento => props.aoAlterado(evento.target.value)} required={props.required} value={props.value}>
                <option value=''>--Selecione--</option>
                {props.itens.map(item => {
                    return <option selected={props.valor === item? "checked": ""} key={item}>{item === "0"? "Inativo":"Ativo"}</option>
                })}
            </select>
        </div>
    )
}

export default ListaSuspensa