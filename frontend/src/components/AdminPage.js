import { useState, useEffect } from 'react'
import Pronto from './prontosadm'

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
  async function getLastItem() {
    try {
      const response = await fetch('http://localhost:3000/fila/list');
      const data = await response.json();
      const ordemItem = data.reduce((max, item) => (item.ordem > max ? item.ordem : max), 0);
      return ordemItem;
    } catch (error) {
      console.error("Erro ao obter a lista de itens:", error);
      return 0; // Retorna 0 se houver um erro
    }
  }

  async function insertDocument(){
  const lastCodigo = await getLastCodigo();
  const lastItem = await getLastItem();
    
    const newItem = lastItem + 1;
    const newCodigo = lastCodigo + 10;
    fetch('http://localhost:3000/fila/add',
      { 
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"text": "", "active": true, "codigo": newCodigo, "ordem": newItem})
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
  function updateFila(item){
    fetch('http://localhost:3000/fila/updatefila',
      { 
        method:"PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      }
    )
    .then(response => response.json())
    .then(() => getData())
  }
  function updateVoltar(item){
    fetch('http://localhost:3000/fila/voltar',
      { 
        method:"PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      }
    )
    .then(response => response.json())
    .then(() => getData())
  }

  async function deleteDocument(item){
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
      <div className="container-proximos">
        <h1>To Do App</h1>

        <div className="filtro">
          <button 
          style={filterItens.filter ? {} : {fontWeight: "bold"}}
          onClick={() => setFilterItens({filter: false})}>Todos</button>

          <button 
          style={((filterItens.filter) && (filterItens.active)) ? {} : {fontWeight: "bold"}}
          onClick={() => setFilterItens({filter: true, active: false})}
          >Pendentes</button>

          <button 
          style={((filterItens.filter) &&  (!filterItens.active))
             ? {} : {fontWeight: "bold"}}
          onClick={() => setFilterItens({filter: true, active: true})}
          >Concluídos</button>
        </div>

        <ul className = "chamandoo">
          { 
            itensToShow.map(item => 
              { 
                if (item.ordem === -1) {
                  return <Pronto item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} updateFila={updateFila} updateVoltar={updateVoltar}/>
                }
                return null
              }
            )
          }
        </ul>

        <ul className = "pronto">
          { 
            itensToShow.map(item => {
              if (item.ordem === 0) {
                return <Pronto item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} updateFila={updateFila} updateVoltar={updateVoltar}/>
              }
              return null
            })
          }
        </ul>

        <ul className = "proximo">
          { 
            itensToShow.map(item => {
              if ((item.ordem!==0) && (item.ordem!==-1)) {
                return <Pronto item={item} updateDocument={updateDocument} deleteDocument={deleteDocument} updateFila={updateFila} updateVoltar={updateVoltar}/>
              }
              return null
            })
          }
        </ul>
        
        <div className="novo">
          <button onClick={insertDocument}>Inserir Novo</button>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
