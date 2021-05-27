import React, {useState, useEffect} from 'react'
import '../vendas/Vendas.css'

const Home = () => {
  const [appState, setAppState] = useState([]);

  useEffect(() => {
    fetch(`https://projeto-stone-api.herokuapp.com/produtos/${localStorage.getItem('id')}`,{
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

  }, [setAppState]);


  return(
    <div className="containerProdutos">
      <h1>Home</h1>
      <h2>Listar produtos</h2>
      <div className="gridFotos">
        {appState.map(produto => (
          <div key={produto.categoria}>
            <h2>
              {produto.titulo}
            </h2>
        <img src={produto.link_img} alt=""/>
      </div>
    ))}
  </div>
  </div>
  )


}

export default Home
