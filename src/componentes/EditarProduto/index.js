import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarProduto.css';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import ListaSuspensa from '../ListaSuspensa';

const EditarProduto = () => {
    const lsStatus = ["1", "0"];

    const { id } = useParams();
    const navigate = useNavigate();

    const [produto, setProduto] = useState({
        nome: '',
        preco: '',
        quantidade: '',
        imagem: '',
        status: ''
    });        

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/produto/obter?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setProduto(data[0]);
          })
          .catch((error) => {
            console.error("Erro ao buscar o produto:", error);
          });
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://127.0.0.1:5000/produto/alterar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        })
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            alert(data.message);
            navigate('/lista-produtos');
          })
          .catch((error) => {
            console.error("Erro ao buscar o produto:", error);
          });
    };

    return (
        <section className="editar-produto">
            <form onSubmit={handleSubmit}>
                <h2>Editar Produto</h2>
                <CampoTexto
                    obrigatorio={true}
                    label="Nome"
                    placeholder="Digite o nome"
                    valor={produto.nome}
                    aoAlterado={(valor) => setProduto({ ...produto, nome: valor })}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Preço"
                    placeholder="Digite o valor"
                    type="number"
                    valor={produto.preco}
                    aoAlterado={(valor) => setProduto({ ...produto, preco: valor })}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Estoque"
                    placeholder="Quantidade em estoque"
                    type="number"
                    valor={produto.quantidade}
                    aoAlterado={(valor) => setProduto({ ...produto, quantidade: valor })}
                />
                
                <CampoTexto
                    label="Imagem"
                    placeholder="URL da imagem do produto"
                    valor={produto.imagem}
                    aoAlterado={(valor) => setProduto({ ...produto, imagem: valor })}
                />

                <div className="campo-container">
                        <ListaSuspensa 
                            obrigatorio={true}
                            label="Status"
                            itens={lsStatus}
                            valor={produto.status}
                            aoAlterado={(valor) => setProduto({ ...produto, status: valor })}
                            />
                </div>

                <div className="botao-container">
                    <Botao>Salvar Alterações</Botao>
                </div>
            </form>
        </section>
    );
};

export default EditarProduto;
