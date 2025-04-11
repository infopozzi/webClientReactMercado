import { useState } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ListaSuspensa from '../ListaSuspensa';
import './Formulario.css';
import { useNavigate } from 'react-router-dom';

const Formulario = (props) => {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:8082/mercado/salvar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: 0,
                nome,
                cnpj,
                email,
                celular,
                senha
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Cadastro Salvo com sucesso. Seu cadastro será validado e enviaremos mais informações por WhatsApp e e-mail.");

            navigate('/lista-produtos');

            setNome('');
            setCnpj('');
            setEmail('');
            setCelular('');
            setSenha('');
        })
        .catch((error) => console.error("Erro ao salvar:", error));
    };

    return (
        <section className="formulario">
            <form onSubmit={handleSubmit}>
                <h2>Preencha os dados para cadastrar seu mercado</h2>

                <div className="formulario-container">
                    <div className="campo-container">
                        <CampoTexto 
                            type="text"
                            obrigatorio={true}
                            label="Nome"
                            placeholder="preencha esse campo"
                            valor={nome}
                            aoAlterado={valor => setNome(valor)}
                        />
                    </div>

                    <div className="campo-container">
                        <CampoTexto 
                            type="text"
                            obrigatorio={true}
                            label="CNPJ"
                            placeholder="preencha esse campo"
                            valor={cnpj}
                            aoAlterado={valor => setCnpj(valor)}
                        />
                    </div>

                    <div className="campo-container">
                        <CampoTexto 
                            type="email"
                            obrigatorio={true}
                            label="E-mail"
                            placeholder="preencha esse campo"
                            valor={email}
                            aoAlterado={valor => setEmail(valor)}
                        />
                    </div>

                    <div className="campo-container">
                        <CampoTexto 
                            type="text"
                            obrigatorio={true}
                            label="Celular"
                            placeholder="preencha esse campo"
                            valor={celular}
                            aoAlterado={valor => setCelular(valor)}
                        />
                    </div>

                    <div className="campo-container">
                        <CampoTexto 
                            type="password"
                            obrigatorio={true}
                            label="Senha"
                            placeholder="preencha esse campo"
                            valor={senha}
                            aoAlterado={valor => setSenha(valor)}
                        />
                    </div>

                </div>

                <div className="botao-container">
                    <Botao>
                        Cadastrar
                    </Botao>
                </div>
            </form>
        </section>
    );
};

export default Formulario;
