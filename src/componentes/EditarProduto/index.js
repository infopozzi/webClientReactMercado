import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarProduto.css';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';

const EditarProduto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: '',
        imagem: '' // novo campo adicionado
    });

        

    useEffect(() => {
        debugger
        fetch(`http://127.0.0.1:5000/produto/obter`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }), // mais enxuto
        })
        .then(res => res.json())
        .then(data => setProduto(data))
        .catch(err => console.error("Erro ao buscar produto:", err));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://127.0.0.1:8082/produtos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        })
        .then(() => {
            alert("Produto atualizado com sucesso!");
            navigate('/lista-produtos');
        })
        .catch(err => console.error("Erro ao atualizar produto:", err));
    };

    return (
        <section className="editar-produto">
            <form onSubmit={handleSubmit}>
                <h2>Editar Produto</h2>
                <CampoTexto
                    label="Nome"
                    placeholder="Digite o nome"
                    valor={produto.nome}
                    aoAlterado={(valor) => setProduto({ ...produto, nome: valor })}
                />
                <CampoTexto
                    label="Descrição"
                    placeholder="Digite uma descrição"
                    valor={produto.descricao}
                    aoAlterado={(valor) => setProduto({ ...produto, descricao: valor })}
                />
                <CampoTexto
                    label="Preço"
                    placeholder="Digite o valor"
                    type="number"
                    valor={produto.preco}
                    aoAlterado={(valor) => setProduto({ ...produto, preco: valor })}
                />
                <CampoTexto
                    label="Estoque"
                    placeholder="Quantidade em estoque"
                    type="number"
                    valor={produto.estoque}
                    aoAlterado={(valor) => setProduto({ ...produto, estoque: valor })}
                />
                <CampoTexto
                    label="Imagem"
                    placeholder="URL da imagem do produto"
                    valor={produto.imagem}
                    aoAlterado={(valor) => setProduto({ ...produto, imagem: valor })}
                />

                <div className="botao-container">
                    <Botao>Salvar Alterações</Botao>
                </div>
            </form>
        </section>
    );
};

export default EditarProduto;
