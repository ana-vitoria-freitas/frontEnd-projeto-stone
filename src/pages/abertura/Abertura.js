import React from 'react'
import {history} from '../../history'
import './Abertura.css'


const Abertura = () =>{
    const handleClick = () =>{
        history.push("/login");
    }

    const handleMeusProdutos = () =>{
        history.push("/produtos");
    }

    const handleMinhasVendas = () =>{
        history.push("/vendas");
    }

    const handleMeusClientes = () =>{
        history.push("/clientes");
    }

    const handleAdicionaProduto = () => {
        history.push("/novoProduto");
    }

    const handleAdicionaCliente = () => {
        history.push("/novoCliente");
    }

    const shouldButtonAppear = !localStorage.getItem('token');
    const buttonShouldAppear = localStorage.getItem('token');

    return (
        <div>
            <h1>Bem vindo a loja Delivery Eletrônicos!</h1>
            <br/>
            <br/>
            {shouldButtonAppear && (
                <button className="botao" onClick={handleClick}> Quero me logar </button>
            )}
            {buttonShouldAppear && (
                <div>
                    <button className="botao" onClick={handleMeusProdutos}>Meus Produtos</button>
                    <br/>
                    <br/>
                    <button className="botao" onClick={handleMinhasVendas}>Minhas Vendas</button>
                    <br/>
                    <br/>
                    <button className="botao" onClick={handleMeusClientes}>Meus Clientes</button>
                    <br/>
                    <br/>
                    <button className="botao" onClick={handleAdicionaProduto}>Adicionar Produto</button>
                    <br/>
                    <br/>
                    <button className="botao" onClick={handleAdicionaCliente}>Adicionar Cliente</button>
                </div>
            )}

        </div>
    )
}

export default Abertura