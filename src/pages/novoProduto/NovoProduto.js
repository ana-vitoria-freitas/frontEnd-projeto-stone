
import React, {useState} from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { history } from '../../history'

import '../login/Login.css'

const NovoProduto = () => {
    const [produto, setProduto] = useState(false);
    const handleMeusProdutos = () =>{
        history.push("/produtos");
    }
    const handleSubmit = async(values) => {

        await fetch(`https://projeto-stone-api.herokuapp.com/produtos/${localStorage.getItem('id')}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "titulo": values.titulo,
                "link_img": values.img,
                "descricao": values.descricao,
                "preco_un": values.preco_un,
                "quantidade": values.quantidade,
                "categoria": values.categoria
            })
        }).then(resp => resp.json())
        .then(data =>{
            if(data.mensagem === "Produto inserido com sucesso!"){
                setProduto(true);
            }

        })
    }

    const validations = yup.object().shape({
        // email: yup.string().email().required(),
        // password: yup.string().min(8).required()
    })
    return (

        <>
            {!produto && <h1>Novo Produto</h1>}
            {!produto && <p>Preencha os campos a seguir para cadastrar um novo produto em sua loja</p>}
            {!produto && (<Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <br/>
                    <p>Digite um título para o anúncio do seu produto</p>
                    <div className="Login-Group">
                        <Field
                            name="titulo"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="titulo"
                            className="Login-Error"
                        />
                    </div>
                    <p>Coloque o link da imagem do seu produto</p>
                    <div className="Login-Group">
                        <Field
                            name="link_img"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="link_img"
                            className="Login-Error"
                        />
                    </div>
                    <p>Coloque uma descrição para o seu produto</p>
                    <div className="Login-Group">
                        <Field
                            name="descricao"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="descricao"
                            className="Login-Error"
                        />
                    </div>
                    <p>Coloque o preço por unidade do seu produto</p>
                    <div className="Login-Group">
                        <Field
                            name="preco_un"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="preco_un"
                            className="Login-Error"
                        />
                    </div>
                    <p>Coloque a quantidade em estoque do seu produto</p>
                    <div className="Login-Group">
                        <Field
                            name="quantidade"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="quantidade"
                            className="Login-Error"
                        />
                    </div>
                    <p>Coloque uma categoria para seu produto</p>
                    <div className="Login-Group">
                        <Field
                            name="categoria"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="categoria"
                            className="Login-Error"
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Cadastrar Produto</button>
                </Form>
            </Formik>)}
            {
            produto && (<>
                <p><strong>Produto inserido com sucesso!</strong></p>
                <br/>
                <br/>
                <button className="botao" onClick={handleMeusProdutos}>Visitar meus Produtos</button>
                </>
            )}
        </>
    )
}

export default NovoProduto