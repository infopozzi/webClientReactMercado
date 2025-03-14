import { useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto'
import ListaSuspensa from '../ListaSuspensa'
import './Formulario.css'

const Formulario = (props) => {

    const lsStatus = ["1","0"]

    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [email, setEmail] = useState('')
    const [celular, setCelular] = useState('')
    const [senha, setSenha] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita recarregar a página
    
        fetch("http://127.0.0.1:8082/mercado/salvar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 0,
            nome: nome,
            cnpj: cnpj,
            email: email,
            celular: celular,
            senha: senha,
            status: 0
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Cadastro Salvo com sucesso. Você recebera um código por whatsap, utilize ele para Ativar seu cadastro", data);
            alert("Cadastro Salvo com sucesso. Você recebera um código por whatsap, utilize ele para Ativar seu cadastro");

            setNome('')
            setCnpj('')
            setEmail('')
            setCelular('')
            setSenha('')
            setStatus('')
          })
          .catch((error) => console.error("Erro ao salvar:", error));
      };

    return (
        <section className="formulario">
            <form onSubmit={handleSubmit}>
                <h2>Preencha os dados para cadastra seu mercado</h2>
                <CampoTexto 
                    type="text"
                    obrigatorio={true}
                    label="Nome"
                    placeholder="preencha esse campo" 
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}
                />
                <CampoTexto
                    type="text"
                    obrigatorio={true}
                    label="CNPJ"
                    placeholder="preencha esse campo" 
                    valor={cnpj}
                    aoAlterado={valor => setCnpj(valor)}
                />
                <CampoTexto
                    type="email"
                    obrigatorio={true}
                    label="E-mail"
                    placeholder="preencha esse campo" 
                    valor={email}
                    aoAlterado={valor => setEmail(valor)}
                />
                <CampoTexto
                    type="text"
                    obrigatorio={true}
                    label="Celular"
                    placeholder="preencha esse campo" 
                    valor={celular}
                    aoAlterado={valor => setCelular(valor)}
                />
                <CampoTexto
                    type="password"
                    obrigatorio={true}
                    label="Senha"
                    placeholder="preencha esse campo" 
                    valor={senha}
                    aoAlterado={valor => setSenha(valor)}
                />
                <ListaSuspensa
                    obrigatorio={true}
                    label="Status" 
                    itens={lsStatus}
                    valor={"0"}
                    aoAlterado={valor => setStatus(valor)}
                />
                <Botao>
                    Cadastrar
                </Botao>
            </form>
        </section>
    )
}

export default Formulario