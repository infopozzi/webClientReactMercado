import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatorioPedido.css';
import CampoTexto from '../CampoTexto';

const RelatorioPedido = () => {

    const [pedidos, setPedidos] = useState([]);
    const [dataInicio, setdataInicio] = useState('');
    const [dataTermino, setdataTermino] = useState('');

    const token = localStorage.getItem('tokenEmpresa');        

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:5000/pedido/listar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                dataInicio,
                dataTermino
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            
              if (data.message){
                alert(data.message)
                //navigete('/login')
              } else setPedidos(data[0]);

        })
        .catch((error) => console.error("Erro ao salvar:", error));
    };


    return (
        <div>
           <form onSubmit={handleSubmit}>

                <h2>Relatório de Pedidos</h2>

                <div className="lista-produtos-header">
                    
                    <div className="campo-container">
                            <CampoTexto 
                                type="text"
                                obrigatorio={true}
                                label="Data Início"
                                placeholder="preencha esse campo"
                                valor={dataInicio}
                                aoAlterado={valor => setdataInicio(valor)}
                            />
                        </div>

                        <div className="campo-container">
                            <CampoTexto 
                                type="text"
                                obrigatorio={true}
                                label="Data Término"
                                placeholder="preencha esse campo"
                                valor={dataTermino}
                                aoAlterado={valor => setdataTermino(valor)}
                            />
                        </div>
                    <br/>
                    <button>Pesquisar</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Data do Pedido</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.length > 0 ? (
                            pedidos.map(pedido => (
                                <tr key={pedido.id_pedido}>
                                    <td>{pedido.id_pedido}</td>
                                    <td>{pedido.dt_pedido}</td>
                                    <td>R$ {pedido.total_pedido.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhum Pedido encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </form>
        </div>
        
    );
};

export default RelatorioPedido;
