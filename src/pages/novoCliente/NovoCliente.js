import React, {useState} from 'react'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { history } from '../../history'
import '../login/Login.css'

const NovoCliente = () => {
    const [cadastrado, setCadastrado] = useState(false);
    const handleMeusClientes = () =>{
        history.push("/clientes");
    }
    const handleSubmit = async(values) => {

        await fetch(`https://projeto-stone-api.herokuapp.com/clientes/${localStorage.getItem('id')}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "nome": values.nome,
                "cpf": values.cpf,
                "email": values.cpf,
                "senha":values.senha,
                "telefone": values.telefone,
                "cep": values.cep,
                "numero_rua": values.numero_rua,
                "complemento": values.complemento
            })  
        }).then(resp => resp.json())
        .then(data =>{  
            if(data.mensagem === "Cliente inserido com sucesso!"){
                setCadastrado(true);
            }

        })
    }

    const validations = yup.object().shape({
        // email: yup.string().email().required(),
        // password: yup.string().min(8).required()
    })
    return (

        <>
            {!cadastrado && <h1>Novo Cliente</h1>}
            {!cadastrado && <p>Preencha os campos a seguir para cadastrar um novo cliente em sua loja</p>}
            {!cadastrado && (<Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <br/>
                    <p>NOME COMPLETO:</p>
                    <div className="Login-Group">
                        <Field
                            name="nome"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="nome"
                            className="Login-Error"
                        />
                    </div>
                    <p>CPF:</p>
                    <div className="Login-Group">
                        <Field
                            name="cpf"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="cpf"
                            className="Login-Error"
                        />
                    </div>
                    <p>EMAIL:</p>
                    <div className="Login-Group">
                        <Field
                            name="email"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="email"
                            className="Login-Error"
                        />
                    </div>
                    <p>SENHA:</p>
                    <div className="Login-Group">
                        <Field
                            name="senha"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="senha"
                            className="Login-Error"
                        />
                    </div>
                    <p>TELEFONE:</p>
                    <div className="Login-Group">
                        <Field
                            name="telefone"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="telefone"
                            className="Login-Error"
                        />
                    </div>
                    <p>CEP</p>
                    <div className="Login-Group">
                        <Field
                            name="cep"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="cep"
                            className="Login-Error"
                        />
                    </div>
                    <p>NÚMERO:</p>
                    <div className="Login-Group">
                        <Field
                            name="numero_rua:"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="numero_rua"
                            className="Login-Error"
                        />
                    </div>
                    <p>COMPLEMENTO:</p>
                    <div className="Login-Group">
                        <Field
                            name="complemento"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="complemento"
                            className="Login-Error"
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Cadastrar Cliente</button>
                </Form>
            </Formik>)}
            {
            cadastrado && (<>
                <p><strong>Cliente inserido com sucesso!</strong></p>
                <br/>
                <br/>
                <button className="botao" onClick={handleMeusClientes}>Visitar meus Clientes</button>
                </>
            )}
        </>
    )
}


export default NovoCliente