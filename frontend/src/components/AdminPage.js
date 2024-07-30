import { useState, useEffect } from 'react'
import Item from './item'
import Pronto from './prontos'
import Proximo from './proximos'

function AdminPage() {

  const [itens, setItens] = useState([])
  const [filterItens, setFilterItens] = useState({filter: false, active: false})

  function getData(){
    fetch('http://localhost:3000/fila/list', {method:"GET"})
    .then(response => response.json())
    .then(data => setItens(data))
  }

  async function getLastCodigo() {
    try {
      const response = await fetch('http://localhost:3000/fila/list');
      const data = await response.json();
      const maxCodigo = data.reduce((max, item) => (item.codigo > max ? item.codigo : max), 0);
      return maxCodigo;
    } catch (error) {
      console.error("Erro ao obter a lista de itens:", error);
      return 0; // Retorna 0 se houver um erro
    }
  }

  async function insertDocument(){
    const lastCodigo = await getLastCodigo();
    const newCodigo = lastCodigo + 100;
    fetch('http://localhost:3000/fila/add',
      { 
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"text": "", "active": true, "codigo": newCodigo})
      }
    )
    .then(response => response.json())
    .then(() => getData())
  }

  function updateDocument(item){
    fetch('http://localhost:3000/fila/update',
      { 
        method:"PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      }
    )
    .then(response => response.json())
    .then(() => getData())
  }

  function deleteDocument(item){
    fetch('http://localhost:3000/fila/delete',
      { 
        method:"DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      }
    )
    .then(response => response.json())
    .then(() => getData())
  }

  useEffect(() => {
    getData()
  }, [])

  const itensToShow = filterItens.filter ? itens.filter(item => item.active === filterItens.active) : itens

  return (
    <div className="wrapper">
      <div className="to-do-list">
        <h1>To Do App</h1>
        { 
          itensToShow.map(item => {
          return <Item item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} />
          })
        }
        <div className="filtro">
          <button 
          style={filterItens.filter ? {} : {fontWeight: "bold"}}
          onClick={() => setFilterItens({filter: false})}
          >Todos</button>

          <button 
          style={((filterItens.filter) && (filterItens.active))
            ? {fontWeight: "bold"} : {}}
          onClick={() => setFilterItens({filter: true, active: true})}
          >Pendentes</button>

          <button 
          style={((filterItens.filter) &&  (!filterItens.active))
             ? {fontWeight: "bold"} : {}}
          onClick={() => setFilterItens({filter: true, active: false})}
          >Concluídos</button>
          
        </div>
        <div className="novo">
          <button onClick={insertDocument}>Inserir Novo</button>
        </div>

        <div className="prontos-scroll">
          <ul className="prontos">
            {itens.map(cadaItem => (
              cadaItem.pronto ? <Pronto key={cadaItem.id} item={cadaItem} /> : null
            ))}
          </ul>
        </div>

        <div className="container-proximos">
          <ul className="proximo">
            {itens.map(cadaItem => (
              !cadaItem.pronto ? <Proximo key={cadaItem.id} item={cadaItem} /> : null
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
