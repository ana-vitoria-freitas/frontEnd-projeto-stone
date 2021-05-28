import React, {useState, useEffect} from 'react'
import '../vendas/Vendas.css'
import {history} from '../../history'

const Clientes = () => {
  const [page, setPage] = useState(1);
  const [qtClientes, setQtClientes] = useState(0);
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () =>{
    if(page !== 1){
      setPage(page - 1);
    }
  }

  const handleMeusProdutos = () =>{
    history.push("/vendas");
  }

  useEffect(() =>{
    fetch(`https://projeto-stone-api.herokuapp.com/clientes/quantidade/${localStorage.getItem('id')}`,{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.json())
    .then(data => {
      setQtClientes(parseInt(data[0].count));
    })


  },[qtClientes]);

  useEffect(() =>{
    fetch(`https://projeto-stone-api.herokuapp.com/clientes/${localStorage.getItem('id')}`,{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.json())
    .then(data => {
      setClientes(data);
    })
    setIsLoading(false);

  },[clientes]);

  return (
    <div>
      <h1>Meus clientes</h1>
      {isLoading && <p>Loading data from the server...</p>}


      <div className="gridFotos">
      {clientes.map((c, index) => (
        <div className="rowGrid" key={index}>
          <img src={c.foto_perfil} alt=""/>
          <p>{`ID cliente: ${c.id}`}</p>
          <p>{`Nome cliente: ${c.nome}`}</p>
          <p>{`Cidade do cliente: ${c.cidade}`}</p>
        <br/>
        </div>
      ))}
      </div>
      {
        clientes.length !== 0 && page !== 1 && (
          <button onClick={previousPage} className="botaoNav" >Anterior</button>
        )
      }
      {
        page !== (Math.ceil(qtClientes/12)) && (
          <button className="botaoNav" >{page}</button>
        )

      }
      {clientes.length !== 0 && page !== (Math.ceil(qtClientes/12)) && (
        <button onClick={nextPage} className="botaoNav">Próxima</button>
      )}
      <br/>
      <button className="botaoNav" onClick={handleMeusProdutos}>Ver minhas Vendas</button>
    </div>
  );
}

export default Clientes