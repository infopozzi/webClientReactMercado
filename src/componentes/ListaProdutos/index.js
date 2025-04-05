import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaProdutos.css';

const ListaProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
    const mercado_id = 1;

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/produto/listar`)
            .then(response => response.json())
            .then(data => setProdutos(data[0]))
            .catch(error => console.error("Erro ao carregar produtos:", error));
    }, []);

    const excluirProduto = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
                debugger


            fetch(`http://127.0.0.1:5000/produto/excluir`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }), // mais enxuto
            })
                .then(() => {
                    alert("Produto excluído com sucesso!");
                    window.location.reload();
                })
                .catch(error => console.error("Erro ao excluir produto:", error));
        }
    };

    const editarProduto = (id) => {
        navigate(`/editar-produto/${id}`);
    };

    const novoProduto = () => {
        navigate('/cadastro-produto');
    };

    return (
        <section className="lista-produtos">
            <div className="lista-produtos-header">
                <h2>Produtos Disponíveis</h2>
                <button onClick={novoProduto}>Novo Produto</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.length > 0 ? (
                        produtos.map(produto => (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>R$ {produto.preco.toFixed(2)}</td>
                                <td>{produto.quantidade}</td>
                                <td>
                                    <button onClick={() => editarProduto(produto.id)}>Editar</button>{' '}
                                    <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nenhum produto encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default ListaProdutos;
