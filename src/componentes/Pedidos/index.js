import './Pedidos.css'
import React, { useEffect, useState } from 'react';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import { useNavigate } from 'react-router-dom';

export default function PedidoForm() {

    const [listaProdutos, setListaProdutos] = useState([]);

    const [pedido, setPedido] = useState([]);

    const [produto, setProduto] = useState({
        codigo: "",
        descricao: "",
        preco: ""
    });
    const [quantidade, setQtde] = useState('');  
    
    
    const navigate = useNavigate();
    const token = localStorage.getItem('tokenEmpresa');        

    useEffect(() => {
        debugger

        carregarProdutos();

    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();

        if (parseInt(quantidade) > produto.estoque)
        {
            alert('Não é possível adicionar mais itens que a quantidade em estoque');
            return;
        }

        const itemExistente = pedido.find(function(item) {
            return item.produto == produto.codigo;
        });

        if (itemExistente)
        {
            alert('Não é possível adicionar o mesmo item duas vezes, exclua ele e adicione com a quantidade atualizada');
            setProduto({ codigo: "", descricao: "", preco: "" });
            setQtde("");
            return;
        }

        const novoItem = {
            produto: produto.codigo,
            descricao: produto.descricao,
            preco: parseFloat(produto.preco),
            quantidade: parseInt(quantidade)
        };

        setPedido([...pedido, novoItem]);

        setProduto({ codigo: "", descricao: "", preco: "" });
        setQtde("");
    };

    const excluir = (index) => {
        if (window.confirm("Tem certeza que deseja excluir esse item?")) {
            const item = pedido.filter((_, i) => i !== index);
            setPedido(item);
        }
    };

    const salvarPedido = () => {   

        if (pedido.length > 0 ){

            fetch("http://127.0.0.1:5000/pedido/cadastrar", {
                                method: "POST",
                                headers: {
                                "Content-Type": "application/json",
                                'Authorization': `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                    
                                    itens: pedido
                                }),
                            })
                            .then((response) => response.json())
                            .then((data) => {

                                alert(data.message)

                                setPedido([]);

                                navigate('/pedido'); 
                                
                                carregarProdutos();
                            })
                            .catch((error) => console.error("Erro ao salvar:", error));
        } else alert('Não existem itens adicionado ao pedido, adicione algum e tente salvar novamente.');        
    };

    const novoPedido = () => {
        if (window.confirm("Tem certeza que deseja começar um novo pedido?")) {
            setPedido([]);
        }
    };

    function aoSelecionar(event) {
    const option = event.target.selectedOptions[0];
    setProduto({
        codigo: event.target.value,
        descricao: option.getAttribute("data-nome"),
        preco: option.getAttribute("data-preco"),
        estoque: option.getAttribute("data-estoque")
    });
    }

    function carregarProdutos(){
        fetch(`http://127.0.0.1:5000/produto/listar`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              
              if (data.message){
                alert(data.message)
                navigate('/login')
              } else setListaProdutos(data[0].filter(item => item.status === true && item.quantidade > 0));

            })
            .catch((error) => {
              
                navigate("/login");

               //console.error("Erro ao buscar o produto:", error);
            });
    }

    return (
        <div>       
            <h1>Pedido de venda</h1>   

            <form onSubmit={handleSubmit}>

                <table id="tbPedidos">
                    <thead>
                        <tr>
                            <th>Produto <br/>

                            <select className='lista-suspensa' onChange={aoSelecionar} value={produto.codigo} required>
                                <option value="">--Selecione--</option>
                                {listaProdutos.map(produto => (
                                    <option value={produto.id} data-nome={produto.nome} data-preco={produto.preco.toFixed(2)} data-estoque={produto.quantidade}>{produto.nome} |R${produto.preco.toFixed(2)} | Estoque: {produto.quantidade}</option>
                                ))}
                            </select>

                            </th>
                            <th>Preço</th>
                            <th>
                            <CampoTexto 
                                type="text"
                                obrigatorio={true}
                                label="Quantidade"
                                placeholder="preencha esse campo"
                                valor={quantidade}
                                aoAlterado={valor => setQtde(valor)}
                            />

                            </th>
                            <th>Total item</th>
                            <th>
                                <Botao>Adicionar</Botao>                        
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.length > 0 ? (
                                pedido.map((item, index) => (
                            <tr key={index}>
                                <td>{item.descricao}</td>
                                <td>{item.preco.toFixed(2)}</td>
                                <td>{item.quantidade}</td>
                                <td>{(item.preco * item.quantidade).toFixed(2)}</td>
                                <td>
                                    <button className='pedido-botao' onClick={() => excluir(index)}>Excluir</button>
                                </td>
                            </tr>
                        ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Nenhum produto adicionado</td>
                                </tr>
                            )}
                    </tbody>
               <tfoot>
                <tr>
                    <td colSpan={3}><strong>Total geral:</strong></td>
                    <td>
                    <strong>{pedido.reduce((total, item) => total + item.quantidade * item.preco, 0).toFixed(2)}</strong>
                    </td>
                    <td></td>
                </tr>
                </tfoot>

                </table>

            </form>
            
            <div className='espacado'>
                <button className='botao' onClick={salvarPedido}>Salvar</button>
                <button className='botao' onClick={novoPedido}>Novo</button>
            </div>
        
        </div>
    );
}
