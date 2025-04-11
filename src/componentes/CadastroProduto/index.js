import { useState } from 'react';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import './CadastroProduto.css';
import { useNavigate } from 'react-router-dom';
import ListaSuspensa from '../ListaSuspensa';

const CadastroProduto = () => {
    const lsStatus = ["1", "0"];

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');
    const [imagem, setImagem] = useState(''); // <-- campo de imagem mantido
    const [status, setStatus] = useState('1');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://127.0.0.1:5000/produto/cadastrar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                preco: parseFloat(preco),
                estoque: parseInt(estoque),
                imagem,
                status                
            }),        })
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            alert(data.message);
            navigate('/lista-produtos');

            // Limpa os campos
            setNome('');
            setPreco('');
            setEstoque('');
            setImagem('');
            setStatus('');
          })
          .catch((error) => {
            console.error("Erro ao buscar o produto:", error);
          });
    };

    return (
        <section className="cadastrar-produto">
            <form onSubmit={handleSubmit}>
                <h2>Cadastro de Produto</h2>

                <div className="campo-container">
                    <CampoTexto 
                        type="text"
                        obrigatorio={true}
                        label="Nome do Produto"
                        placeholder="Digite o nome"
                        valor={nome}
                        aoAlterado={valor => setNome(valor)}
                    />
                </div>
                <div className="campo-container">
                    <CampoTexto 
                        type="number"
                        obrigatorio={true}
                        label="Preço"
                        placeholder="Digite o valor"
                        valor={preco}
                        aoAlterado={valor => setPreco(valor)}
                    />
                </div>
                <div className="campo-container">
                    <CampoTexto 
                        type="number"
                        obrigatorio={true}
                        label="Estoque"
                        placeholder="Quantidade em estoque"
                        valor={estoque}
                        aoAlterado={valor => setEstoque(valor)}
                    />
                </div>
                <div className="campo-container">
                    <CampoTexto 
                        type="text"
                        obrigatorio={false}
                        label="Imagem"
                        placeholder="URL da imagem do produto"
                        valor={imagem}
                        aoAlterado={valor => setImagem(valor)}
                    />
                </div>

                <div className="campo-container">
                        <ListaSuspensa 
                            obrigatorio={true}
                            label="Status"
                            itens={lsStatus}
                            valor={status}
                            aoAlterado={valor => setStatus(valor)}
                        />
                    </div>

                <div className="botao-container">
                    <Botao>Cadastrar Produto</Botao>
                </div>
            </form>
        </section>
    );
};

export default CadastroProduto;
