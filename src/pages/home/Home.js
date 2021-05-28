import React, {useState, useEffect} from 'react'
import '../vendas/Vendas.css'
import {history} from '../../history'


const Home = () => {
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

  const handleMinhasVendas = () =>{
    history.push("/vendas");
  }

  const handleDeletaProduto = () =>{
    history.push("/deletaProduto");
  }


  useEffect(() =>{
    fetch(`https://projeto-stone-api.herokuapp.com/produtos/${localStorage.getItem('id')}`)
    .then((response) => response.json())
    .then(data => {
      setQtProdutos(data[0].count);
    })

  },[qtProdutos]);

  useEffect(() => {
    fetch(`https://projeto-stone-api.herokuapp.com/produtos/${localStorage.getItem('id')}/${page}/12`,{
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
      <h1>Produtos</h1>
      {isLoading && <p>Loading data from the server...</p>}


      <div className="gridFotos">
      {appState.map((c, index) => (
        <>
        <div className="rowGrid" key={index}>
          <img src={c.link_img} alt=""/>
          <p>{`ID produto: ${c.id}`}</p>
          <p>{c.titulo}</p>
        </div>
        <br/>
        </>
        ))}
      </div>
      <div className="flexDiv">
      {
        appState.length !== 0 && page !== 1 && (
          <button onClick={previousPage} className="botaoNav">Anterior</button>
        )
      }
      {
        page !== (Math.ceil(qtProdutos/12)) && !isLoading && (
          <button className="botaoNav">{page}</button>
        )

      }
      {appState.length !== 0 && page !== (Math.ceil(qtProdutos/12)) && (
        <button onClick={nextPage} className="botaoNav">Próxima</button>
      )}
      </div>
      <br/>
      <button className="botaoNav" onClick={handleMinhasVendas}>Ver minhas Vendas</button>
      <br/>
      <button className="botaoNav" onClick={handleDeletaProduto}>Deletar algum produto</button>
    </div>
  );



}

export default Home
