import './App.css';
import './CSS/alert.css';
import './CSS/styles.css';
import './CSS/prontos.css';
import './CSS/proximos.css';


function App() {
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
              <img class="seta" src="../public/img/arrow.png" alt="voltar" />
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
                <li class="pedidos-prontos">
                  <p>090</p>
                </li>
                <li class="pedidos-prontos">
                  <p>080</p>
                </li>
                <li class="pedidos-prontos">
                  <p>070</p>
                </li>
                <li class="pedidos-prontos">
                  <p>060</p>
                </li>
                <li class="pedidos-prontos">
                  <p>050</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="container-proximos">
          <p class="titulo-proximos">Proximos</p>
          <ul class="proximo">
            <li class="filas">
              <div class="lugar">
                <p>1º</p>
              </div>
              <p>Luccas</p>
              <img src="../public/img/Sino.png" alt="alerta" class="invert-on-hover" />
            </li>
            <li class="filas">
              <div class="lugar">
                <p>2º</p>
              </div>
              <p>03812</p>
              <img src="../public/img/Sino.png" alt="alerta" class="invert-on-hover" />
            </li>
            <li class="filas">
              <div class="lugar">
                <p>3º</p>
              </div>
              <p>100</p>
              <img src="../public/img/Sino.png" alt="alerta" class="invert-on-hover" />
            </li>
            <li class="filas">
              <div class="lugar">
                <p>4º</p>
              </div>
              <p>Wilian</p>
              <img src="../public/img/Sino.png" alt="alerta" class="invert-on-hover" />
            </li>
          </ul>
        </div>
      </body>
      <script src="/script.js"></script>
    </div>
  );
}

export default App;
