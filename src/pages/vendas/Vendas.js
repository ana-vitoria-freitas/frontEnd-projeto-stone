import React, {useState, useEffect} from 'react'
import './Vendas.css'
import {history} from '../../history'

const Vendas = () => {
  const [appState, setAppState] = useState([]);
  const [page, setPage] = useState(1);
  const [qtProdutos, setQtProdutos] = useState(0);
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
    history.push("/produtos");
  }

  useEffect(() =>{
    fetch(`https://projeto-stone-api.herokuapp.com/vendas/${localStorage.getItem('id')}`,{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.json())
    .then(data => {
      setQtProdutos(data[0].count);
    })

    console.log(qtProdutos);

  },[qtProdutos]);

  useEffect(() => {
    fetch(`https://projeto-stone-api.herokuapp.com/vendas/${localStorage.getItem('id')}/${page}/12`,{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => response.json())
    .then(data => {
      setAppState(data);
    })
    .catch(err=>console.log(err));


    setIsLoading(false);

  }, [page]);

  return (
    <div>
      <h1>Vendas</h1>
      {isLoading && <p>Loading data from the server...</p>}


      <div className="gridFotos">
      {appState.map((c, index) => (
        <div className="rowGrid">
          <img src={c.foto_produto} alt=""/>
          <p>{c.nome_cliente}</p>
        <br/>
        </div>
      ))}
      </div>
      {
        appState.length !== 0 && page !== 1 && (
          <button onClick={previousPage} className="botaoNav" >Anterior</button>
        )
      }
      {
        page !== (Math.ceil(qtProdutos/12)) && (
          <button className="botaoNav" >{page}</button>
        )

      }
      {appState.length !== 0 && page !== (Math.ceil(qtProdutos/12)) && (
        <button onClick={nextPage} className="botaoNav">Próxima</button>
      )}
      <br/>
      <button className="botaoNav" onClick={handleMeusProdutos}>Ver meus Produtos</button>
    </div>
  );
}

export default Vendas