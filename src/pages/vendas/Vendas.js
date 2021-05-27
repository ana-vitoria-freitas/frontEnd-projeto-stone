import React, {useState} from 'react'
import './Vendas.css'
import '../../components/Pagination/Pagination'


const Vendas = () => {
   const [dados, setDados] = useState([]);

    fetch(`https://projeto-stone-api.herokuapp.com/vendas/vendasClientes/${localStorage.getItem('id')}`)
    .then((response) => response.json())
    .then(data => setDados(data))
    .catch(err=>console.log(err));

   
   return(<div>

    <h1>Vendas</h1>
    <h2>Listar vendas</h2>
    <div className="gridFotos">
    {dados.map(venda => (
        <li key={venda.nome}>
          <h2>
            <strong>Preço: </strong>
            {venda.preco}
          </h2>
          <img src={venda.link_img} alt=""/>
      </li>

    ))}
  </div>
      <Pagination />
   </div>
   )
   
}

export default Vendas