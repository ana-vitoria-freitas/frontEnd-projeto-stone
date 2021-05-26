import React, {useState} from 'react'
import '../vendas/Vendas.css'

const Home = () => {
   const [dados, setDados] = useState([]);

    fetch(`https://projeto-stone-api.herokuapp.com/produtos/${localStorage.getItem('id')}`)
    .then((response) => response.json())
    .then(data => setDados(data))
    .catch(err=>console.log(err));

   
   return(
     <div className="containerProdutos">
    <h1>Home</h1>
    <h2>Listar produtos</h2>
    <div className="gridFotos">
    {dados.map(produto => (
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
