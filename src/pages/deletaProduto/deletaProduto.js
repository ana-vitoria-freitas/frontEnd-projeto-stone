
import React, {useState, useEffect} from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { history } from '../../history'

import '../login/Login.css'

const NovoProduto = () => {
    const [podeDeletar, setPodeDeletar] = useState(false);
    const [naoPodeDeletar, setNaoPodeDeletar] = useState(false);
    const [idProduto, setIdProduto] = useState(0);
    const handleMeusProdutos = () =>{
        history.push("/produtos");
    }
    const handleSubmit = async(values) => {
            await fetch(`https://projeto-stone-api.herokuapp.com/produtos/${values.idProduto}/${localStorage.getItem('id')}`,{
                method: 'DELETE',
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json',
                //     'Authorization': `Bearer ${localStorage.getItem('token')}`
                // },
            }).then(resp => resp.json())
            .then(data =>{
                setIdProduto(values.idProduto);
                console.log(data);
                if(data.mensagem === "Produto deletado devidamente"){
                    setPodeDeletar(true);
                    setNaoPodeDeletar(false);
                }else if(data.mensagem === "Produto inexistente"){
                    setPodeDeletar(false);
                    setNaoPodeDeletar(true);
                }
            })
    }

    return (

        <>
            {!podeDeletar && !naoPodeDeletar && <h1>Deletar Produto</h1>}
            {!podeDeletar && !naoPodeDeletar &&<p>Preencha o campo a seguir com o ID do produto que deseja deletar da sua loja</p>}
            {!podeDeletar &&!naoPodeDeletar && (<Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                >
                <Form className="Login">
                    <br/>
                    <div className="Login-Group">
                        <Field
                            name="idProduto"
                            className="Login-Field"
                            />
                        <ErrorMessage
                            component="span"
                            name="idProduto"
                            className="Login-Error"
                            />
                    </div>
                    <button className="Login-Btn" type="submit" >Deletar Produto</button>
                </Form>
            </Formik>)}
            {
            podeDeletar && !naoPodeDeletar && (<>
                <p><strong>Produto deletado com sucesso!</strong></p>
                <br/>
                <br/>
                <button className="botao" onClick={handleMeusProdutos}>Visitar meus Produtos</button>
                </>
            )}
            {
                naoPodeDeletar && (
                    <>
                    <p><strong>Produto de id {idProduto} não existe na sua loja! Tente outro produto com id válido para que esse possa ser deletado</strong></p>
                    <br/>
                    <br/>
                    <button className="botao" onClick={handleMeusProdutos}>Visitar meus Produtos</button>
                    </>
                )
            }
        </>
    )
}

export default NovoProduto