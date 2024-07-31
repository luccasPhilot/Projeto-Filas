import React, { useState, useEffect } from 'react';
import '../CSS/alert.css';
import '../CSS/styles.css';
import '../CSS/prontos.css';
import '../CSS/proximos.css';
import Alert from './Alert';

import Pronto from './prontos';
import Proximo from './proximos';

function UserPage() {
  const [itens, setItens] = useState([]);

  function getData() {
    fetch('http://localhost:3000/fila/list', { method: 'GET' })
      .then(response => response.json())
      .then(data => setItens(data));
  }

  const [isAlertOpen, setIsAlertOpen] = useState(false)

  useEffect(() => {
    getData()
    setIsAlertOpen(true)
  }, []);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  }
  const handleConfirmAlert = (number) => {
    console.log('Number entered:', number);
    setIsAlertOpen(false);
  };

  return (
    <div className="App">
      <div>
      <h1>User Page</h1>
      <Alert
        isOpen={isAlertOpen}
        onClose={handleCloseAlert}
        onConfirm={handleConfirmAlert}
        lista={itens}
      />
      </div>

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
                (!cadaItem.active) ? <Pronto key={cadaItem.id} item={cadaItem} /> : null
              ))}
            </ul>
          </div>
        </div>
        <div className="container-proximos">
          <p className="titulo-proximos">Proximos</p>
          <ul className="proximo">
            {itens.map(cadaItem => (
              cadaItem.active ? <Proximo key={cadaItem.id} item={cadaItem} /> : null
            ))}
          </ul>
        </div>
      </div>
      <script src="/script.js"></script>
    </div>
  );
}

export default UserPage;
