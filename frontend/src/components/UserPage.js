import React, { useState, useEffect } from 'react';
import '../CSS/alert.css';
import '../CSS/styles.css';
import '../CSS/prontos.css';
import '../CSS/proximos.css';

import Pronto from './prontos';
import Proximo from './proximos';

function UserPage() {
  const [itens, setItens] = useState([]);

  function getData() {
    fetch('http://localhost:3000/fila/list', { method: 'GET' })
      .then(response => response.json())
      .then(data => setItens(data));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="container-principal">
        <header>
          <nav className="navigation">
            <img className="seta" src="./img/arrow.png" alt="voltar" />
            <a href="./admin.html">
              <h1 id="logo">FILA</h1>
            </a>
            <h1 id="rest">Restaurante</h1>
          </nav>
        </header>
        <div className="container-prontos">
          <p className="titulo-prontos">Prontos</p>
          <div className="chamando">
            <p>100</p>
            <span>5 minutos atrás</span>
          </div>
          <div className="prontos-scroll">
            <ul className="prontos">
              {itens.map(cadaItem => (
                cadaItem.pronto ? <Pronto key={cadaItem.id} item={cadaItem} /> : null
              ))}
            </ul>
          </div>
        </div>
        <div className="container-proximos">
          <p className="titulo-proximos">Proximos</p>
          <ul className="proximo">
            {itens.map(cadaItem => (
              !cadaItem.pronto ? <Proximo key={cadaItem.id} item={cadaItem} /> : null
            ))}
          </ul>
        </div>
      </div>
      <script src="/script.js"></script>
    </div>
  );
}

export default UserPage;
