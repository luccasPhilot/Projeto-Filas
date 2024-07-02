const button = document.querySelector('.add')
const buttonAleatorio = document.querySelector('.aleatorio')
const input = document.querySelector('.input-codigo')
const filaCompleta = document.querySelector('.lista')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
  if (input.value != "") {
    minhaListaDeItens.push({
      tarefa: input.value,
      concluida: false,
    })
  } else {
    alert("Número do pedido não pode ser vazio")
  }
  input.value = ''
  mostrarTarefas()
}

function adicionarAletorio() {
  const numeroSequencial = minhaListaDeItens.length + 1;
  minhaListaDeItens.push({
    tarefa: numeroSequencial,
    concluida: false,
  })
  input.value = ''
  mostrarTarefas()
}

function mostrarTarefas() {
  let novaLi = ''

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi = novaLi +
      `
          <li class="filas ${item.concluida && "done"}">
            <div class="lugar">
                <p>${posicao + 1}º</p>
            </div>
            <p>${item.tarefa}</p>
            <img src="./img/checked.png" alt="alerta" class="imgAdmin" onclick="concluirItem(${posicao})">
            <img src="./img/trash.png" alt="alerta" class="imgAdmin" onclick="deletarItem(${posicao})">
          </li>

      `
  })

  filaCompleta.innerHTML = novaLi
}

function concluirItem(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
  mostrarTarefas()
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1)
  mostrarTarefas()
}

button.addEventListener('click', adicionarNovaTarefa)
buttonAleatorio.addEventListener('click', adicionarAletorio)