import React, {useState, useEffect} from 'react'
import '../vendas/Vendas.css'


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


      {appState.map((c, index) => (
        <div key={index}>
          <p>{c.titulo}</p>
        </div>
      ))}
      {
        appState.length !== 0 && page !== 1 && (
          <button onClick={previousPage}>Anterior</button>
        )
      }
      {
        page !== (Math.ceil(qtProdutos/12)) && (
          <button>{page}</button>
        )

      }
      {appState.length !== 0 && page !== (Math.ceil(qtProdutos/12)) && (
        <button onClick={nextPage}>Próxima</button>
      )}
    </div>
  );



}

export default Home
