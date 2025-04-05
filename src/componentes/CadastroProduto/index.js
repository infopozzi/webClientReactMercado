import { useState } from 'react';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import './CadastroProduto.css';
import { useNavigate } from 'react-router-dom';

const CadastroProduto = () => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');
    const [mercadoId, setMercadoId] = useState('');
    const [imagem, setImagem] = useState(''); // <-- campo de imagem mantido

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger

        fetch("http://127.0.0.1:5000/produto/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome,
                preco: parseFloat(preco),
                estoque: parseInt(estoque),
                imagem                
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert("Produto cadastrado com sucesso!");
            navigate('/lista-produtos');

            // Limpa os campos
            setNome('');
            setPreco('');
            setEstoque('');
            setImagem('');
            setMercadoId('');
        })
        .catch(error => console.error("Erro ao salvar:", error));
    };

    return (
        <section className="formulario">
            <form onSubmit={handleSubmit}>
                <h2>Cadastro de Produto</h2>

                <div className="formulario-container">
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
                        <CampoTexto 
                            type="number"
                            obrigatorio={true}
                            label="ID do Mercado"
                            placeholder="Digite o ID do mercado"
                            valor={mercadoId}
                            aoAlterado={valor => setMercadoId(valor)}
                        />
                    </div>
                </div>

                <div className="botao-container">
                    <Botao>Cadastrar Produto</Botao>
                </div>
            </form>
        </section>
    );
};

export default CadastroProduto;
