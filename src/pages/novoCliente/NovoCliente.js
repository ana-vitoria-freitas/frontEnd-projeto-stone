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

        await fetch(`https://projeto-stone-api.herokuapp.com/clientes/porUsuario/${localStorage.getItem('id')}`,{
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "nome": values.nome,
                "telefone": values.telefone,
                "cep": values.cep,
                "numero_rua": values.numero_rua,
                "complemento": values.complemento,
                "foto_perfil": values.foto_perfil,
                "id_usuario": localStorage.getItem('id')
            })
        }).then(resp => resp.json())
        .then(data =>{
            if(data.mensagem === "Cliente inserido com sucesso"){
                setCadastrado(true);
            }

        })
    }

    const validations = yup.object().shape({
        foto_perfil: yup.string().max(200).required(),
        nome: yup.string().max(64).required(),
        telefone: yup.number().min(8).required(),
        cep: yup.string().min(8).required(),
        numero_rua: yup.number().min(2).required(),
        password: yup.string().min(8).required()
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
                    <p>Digite o nome completo do seu cliente</p>
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
                    <p>Adicione uma foto de perfil para seu cliente (Link da imagem)</p>
                    <div className="Login-Group">
                        <Field
                            name="foto_perfil"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="foto_perfil"
                            className="Login-Error"
                        />
                    </div>
                    <p>Digite o número de telefone do seu cliente com DDD</p>
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
                    <p>Digite o CEP do seu cliente</p>
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
                    <p>Número da rua do seu cliente</p>
                    <div className="Login-Group">
                        <Field
                            name="numero_rua"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="numero_rua"
                            className="Login-Error"
                        />
                    </div>
                    <p>Complemente o endereço do seu cliente</p>
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