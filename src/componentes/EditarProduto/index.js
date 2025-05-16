import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarProduto.css';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import ListaSuspensa from '../ListaSuspensa';
import FileUploadHandler from '../FileUpload';

const EditarProduto = () => {
    const lsStatus = [0, 1];

    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('tokenEmpresa');        

    const [produto, setProduto] = useState({
        nome: '',
        preco: '',
        quantidade: '',
        imagem: null,
        status: ''
    });        

    useEffect(() => {

        fetch(`http://127.0.0.1:5000/produto/obter?id=${id}`, {
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
            

            setProduto(prev => ({...prev,
                nome: data[0].nome,
                preco: data[0].preco,
                quantidade: data[0].quantidade,
                imagem: data[0].imagem,
                status: data[0].status ? "1":"0"
              }));

            //setProduto(data[0]);
          })
          .catch((error) => {
            navigate("/login");

            //console.error("Erro ao buscar o produto:", error);
          });
      }, []);

      const handleSubmit = (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        formData.append("id", id); 
        formData.append("nome", produto.nome); 
        formData.append("preco", produto.preco); 
        formData.append("quantidade", produto.quantidade); 

        if (produto.imagem instanceof File) {
            formData.append("imagem", produto.imagem);
          } else {
            formData.append("imagem_existente", produto.imagem);
        }

        formData.append("imagem", produto.imagem); 
        formData.append("status", parseInt(produto.status)); 

        fetch(`http://127.0.0.1:5000/produto/alterar`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,            
          },
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
            navigate("/login");

            //console.error("Erro ao salvar o produto:", error);
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
    
        setProduto({ ...produto, imagem: file });
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
                    type="text"
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
          
                <div className="campo-texto">
                    <label>Imagem do produto</label>

                    <img src={produto.imagem} alt='imagem do produto'></img>

                    <FileUploadHandler aoAlterado={handleFileChange} />
                </div>      

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
