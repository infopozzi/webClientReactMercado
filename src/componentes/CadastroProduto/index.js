import { useState } from 'react';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import './CadastroProduto.css';
import { useNavigate } from 'react-router-dom';
import ListaSuspensa from '../ListaSuspensa';
import FileUploadHandler from '../FileUpload';

const CadastroProduto = () => {
    const lsStatus = ["1", "0"];

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [imagem, setImagem] = useState(null);
    const [status, setStatus] = useState('1');

    const handleSubmit = (event) => {
        
        event.preventDefault();
      
        const formData = new FormData();
        formData.append("nome", nome); 
        formData.append("preco", preco); 
        formData.append("quantidade", quantidade); 
        formData.append("imagem", imagem); 
        formData.append("status", parseInt(status)); 
      
        fetch(`http://127.0.0.1:5000/produto/cadastrar`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            alert(data.message);
            navigate("/lista-produtos");
          })
          .catch((error) => {
            console.error("Erro ao salvar o produto:", error);
          });
      };

    const handleFileChange = (file) => {
        if (!file) return;
    
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
          alert('Por favor selecione um arquivo de PNG ou JPEG para o arquivo.');
          return;
        }
    
        if (file.size > 1024 * 1024) {
          alert('Arquivo não pode exceder 1MB.');
          return;
        }
    
        setImagem(file);
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
                        type="text"
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
                        valor={quantidade}
                        aoAlterado={valor => setQuantidade(valor)}
                    />
                </div>

                <div className="campo-texto">
                    <label>Imagem do produto</label>
                    
                    <img src={imagem}></img>

                    <FileUploadHandler aoAlterado={handleFileChange} />
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
