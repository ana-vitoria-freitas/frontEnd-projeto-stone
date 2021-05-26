import React, {useState} from 'react'
import './Vendas.css'

const Vendas = () => {
   const [dados, setDados] = useState([]);

    fetch(`https://projeto-stone-api.herokuapp.com/vendas/${localStorage.getItem('id')}`)
    .then((response) => response.json())
    .then(data => setDados(data))
    .catch(err=>console.log(err));

   
   return(<div>

    <h1>Vendas</h1>
    <h2>Listar vendas</h2>
    <div className="gridFotos">
    {dados.map(venda => (
        <li key={venda.id}>
          {/* <h2>
            <strong>Título: </strong>
            {produto.titulo}
          </h2>
          <img src={produto.link_img} alt=""/> */}
      </li>

    ))}
  </div>
   </div>
   )
   
}

export default Vendas