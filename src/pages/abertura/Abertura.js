import React from 'react'
import {history} from '../../history'
import './Abertura.css'


const Abertura = () =>{
    const handleClick = () =>{
        history.push("/login");
    }

    return (
        <div>
            <h1>Bem vindo a loja Delivery Eletrônicos!</h1>
            <br/>
            <br/>
            <button className="botao" onClick={handleClick}> Quero me logar </button>

        </div>
    )
}

export default Abertura