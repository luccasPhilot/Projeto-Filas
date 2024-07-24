import React, { useState, useEffect } from 'react';
import '../CSS/alert.css';
import '../CSS/styles.css';
import '../CSS/prontos.css';
import '../CSS/proximos.css';

function AdminPage (){
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/fila/list');
      if (!response.ok) {
        throw new Error('Erro ao buscar itens');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await fetch('http://localhost:3000/fila/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItem }),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar item');
      }
      setNewItem('');
      fetchItems();
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    }
  };

  const editItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/fila/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editValue }),
      });
      if (!response.ok) {
        throw new Error('Erro ao editar item');
      }
      setEditingItem(null);
      setEditValue('');
      fetchItems();
    } catch (error) {
      console.error('Erro ao editar item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/fila/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar item');
      }
      fetchItems();
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <header>
        <nav className="navigation">
          <img className="seta" src="./img/arrow.png" alt="voltar" />
          <a href="/user">
            <h1 id="logo">FILA</h1>
          </a>
          <h1 id="rest">Admin</h1>
        </nav>
      </header>
      
      <div className="container-principal">
        <h1>Página do Admin</h1>
        
        <div>
          <h2>Adicionar Novo Item</h2>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Digite o nome do novo item"
          />
          <button onClick={addItem}>Adicionar</button>
        </div>

        <div>
          <h2>Itens</h2>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {editingItem === item.id ? (
                  <div>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder="Digite o novo valor"
                    />
                    <button onClick={() => editItem(item.id)}>Salvar</button>
                  </div>
                ) : (
                  <span>{item.name}</span>
                )}
                <button onClick={() => setEditingItem(item.id)}>Editar</button>
                <button onClick={() => deleteItem(item.id)}>Deletar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
