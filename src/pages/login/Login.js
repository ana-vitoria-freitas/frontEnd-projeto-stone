import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { history } from '../../history'

import './Login.css'

const Login = () => {
    const handleSubmit = async (values) => {
        await fetch('https://projeto-stone-api.herokuapp.com/usuarios/verificaUsuario', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": values.email,
                "password": values.password
            })
        })
        .then(resp => resp.json())
        .then(data =>{
            console.log(data);
            if (data.mensagem === "Usuário com credenciais válidas") {
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.id);
                history.push('/produtos')
            }

        })
    }

    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    })
    return (
        <>
            <h1>Login</h1>
            <p>Fill the fields to continue</p>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
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
                    <div className="Login-Group">
                        <Field
                            name="password"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="Login-Error"
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Login</button>
                </Form>
            </Formik>
        </>
    )
}

export default Login
