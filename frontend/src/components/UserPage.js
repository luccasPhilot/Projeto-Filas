import React, { useState, useEffect } from 'react';
import '../CSS/alert.css';
import '../CSS/styles.css';
import '../CSS/prontos.css';
import '../CSS/proximos.css';

import Alert from './Alert';
import Pronto from './prontos';
import Proximo from './proximos';
import Chamando from './Chamando';

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

  const [highlightedNumber, setHighlightedNumber] = useState(null);
  const handleConfirmAlert = (number) => {
    setHighlightedNumber(number);
    setIsAlertOpen(false);
  };

  return (
    <div className="App">
      <div>
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
            <div class="left-group">
              <img className="seta" src="./img/arrow.png" alt="voltar" />

              <a href="./admin.html">
                <h1 className="logo">FILA</h1>
              </a>
            </div>
            <h1 className="rest">Restaurante</h1>
          </nav>
        </header>
        <div className="container-prontos">
          <div>
            {itens.map(cadaItem => (
              (cadaItem.ordem === -1) ? (
                <Chamando
                  item={cadaItem}
                  highlighted={highlightedNumber === cadaItem.codigo}
                />
              ) : null
            ))}
          </div>
          <div className='naoveio'>
            <p>
              Ver já chamados
            </p>
          </div>
          {/*
          <div className="prontos-scroll">
            <ul className="prontos">
              {itens.map(cadaItem => (
                (cadaItem.ordem === 0) ? (
                  <Pronto
                    item={cadaItem}
                    highlighted={highlightedNumber === cadaItem.codigo}
                  />
                ) : null
              ))}
            </ul>
          </div>
          */}
        </div>
        <div className="container-proximos">
          <ul className="proximo">
            {itens.map(cadaItem => (
              cadaItem.ordem != 0 && cadaItem.ordem != -1 ? (
                <Proximo 
                  item={cadaItem}
                  highlighted={highlightedNumber === cadaItem.codigo}
                />
              ) : null
            ))}
          </ul>
        </div>
      </div>
      <script src="/script.js"></script>
    </div>
  );
}

export default UserPage;
