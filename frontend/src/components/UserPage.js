import '../CSS/alert.css';
import '../CSS/styles.css';
import '../CSS/prontos.css';
import '../CSS/proximos.css';

import { useState, useEffect } from 'react'

import Admin from './admin'
import Proximo from './proximos'
import Pronto from './prontos'

function UserPage() {

  const [itens, setItens] = useState([])

  function getData() {
    fetch('http://localhost:3000/fila/list', { method: "GET" })
      .then(response => response.json())
      .then(data => setItens(data))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <body>
        <div id="customAlert" class="modal">
          <div class="modal-content">
            <span id="closeBtn" class="close">&times;</span>
            <p id="alert-frase">Informe sua senha:</p>
            <input type="text" id="numericCode" placeholder="Código numérico" />
            <button id="cancelBtn" class="cancel-btn">Cancelar</button>
            <button id="confirmBtn">Confirmar</button>
          </div>
        </div>
        <div class="container-principal">
        <header>
            <nav class="navigation">
                <img class="seta" src="./img/arrow.png" alt="voltar" />
                <a href="./admin.html">
                    <h1 id="logo">FILA</h1>
                </a>
                <h1 id="rest">Restaurante</h1>
            </nav>
        </header>

          <div class="container-prontos">
            <p class="titulo-prontos">Prontos</p>
            <div class="chamando">
              <p>100</p>
              <span>5 minutos atrás</span>
            </div>
            <div class="prontos-scroll">
              <ul class="prontos">
                {
                  itens.map(cadaItem => {
                    if(cadaItem.pronto){
                      return <Pronto item={cadaItem} />
                    }
                  })
                }
              </ul>
            </div>
          </div>
        </div>

        <div class="container-proximos">
          <p class="titulo-proximos">Proximos</p>
          <ul class="proximo">
            {
              itens.map(cadaItem => {
                if(cadaItem.pronto == false){
                  return <Proximo item={cadaItem} />
                }
              })
            }
          </ul>
        </div>
      </body>
      <script src="/script.js"></script>
    </div>
  );
}

export default App;