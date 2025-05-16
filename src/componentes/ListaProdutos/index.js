import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaProdutos.css';

const ListaProdutos = () => {

    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('tokenEmpresa');        

    useEffect(() => {
        
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
              } else setProdutos(data[0]);

            })
            .catch((error) => {
              
                navigate("/login");

               //console.error("Erro ao buscar o produto:", error);
            });

    }, []);

    const excluirProduto = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {

            fetch(`http://127.0.0.1:5000/produto/excluir`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`,
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
                        <th>Imagem</th>
                        <th>Status</th>
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
                                <td><img src={produto.imagem}></img> </td>
                                <td>{produto.status ? "Ativo": "Inativo"}</td>
                                <td>
                                    <button className='button' onClick={() => editarProduto(produto.id)}>Editar</button>{' '}
                                    <button className='button' onClick={() => excluirProduto(produto.id)}>Excluir</button>
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
