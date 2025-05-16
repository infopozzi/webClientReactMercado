import { useEffect,useState } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {

        localStorage.removeItem('tokenEmpresa');
        
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:5000/mercado/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                senha
            }),
        })
        .then((response) => response.json())
        .then((data) => {            
            
            if (data.message)
                alert(data.message);
            else{

                localStorage.setItem('tokenEmpresa', data.token);
                navigate('/lista-produtos');
            } 

            setEmail('');
            setSenha('');
        })
        .catch((error) => console.error("Erro ao salvar:", error));
    };

    return (
        <section className="formulario">
            <form onSubmit={handleSubmit}>
                <h1>Acesso Restrito</h1>
                <div className="formulario-container">
                    <div className="campo-container">
                        <CampoTexto 
                            type="text"
                            obrigatorio={true}
                            label="E-mail"
                            placeholder="preencha o E-mail"
                            valor={email}
                            aoAlterado={valor => setEmail(valor)}
                        />
                    </div> <br/>

                    <div className="campo-container">
                        <CampoTexto 
                            type="password"
                            obrigatorio={true}
                            label="Senha"
                            placeholder="preencha a senha"
                            valor={senha}
                            aoAlterado={valor => setSenha(valor)}
                        />
                    </div> <br/>

                    <Botao>
                        Entrar
                    </Botao>
                </div>

            </form>
        </section>
    );
};

export default Login;
