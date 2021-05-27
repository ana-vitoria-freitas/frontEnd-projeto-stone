import React, {useState} from 'react'
import './Vendas.css'
import '../../components/Pagination/Pagination'

const Vendas = () => {
  const [appState, setAppState] = useState([]);

    useEffect(() => {
      fetch(`https://projeto-stone-api.herokuapp.com/vendas/${localStorage.getItem('id')}`,{
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



   return(<div>

    <h1>Vendas</h1>
    <h2>Listar vendas</h2>
    <div className="gridFotos">
    {appState.map(venda => (
        <li key={venda.nome_cliente}>
          <h2>
            <strong>Preço: </strong>
            {venda.preco_venda}
          </h2>
          <img src={venda.id_cliente} alt=""/>
      </li>

    ))}
  </div>
   <Pagination />
  </div>
   )
   
}

export default Vendas