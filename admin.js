const button = document.querySelector('.add')
const input = document.querySelector('.input-codigo')
const filaCompleta = document.querySelector('.lista')

let minhaListaDeItens = []

function adicionarNovaTarefa() {
    minhaListaDeItens.push({
      tarefa: input.value,
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
                <p>${posicao+1}</p>
            </div>
            <p>${item.concluida}</p>
            <p>${item.tarefa}</p>
            <img src="./img/Sino.png" alt="alerta" class="invert-on-hover" onclick="concluirTarefa(${posicao})">
          </li>

          `
    })
    
    filaCompleta.innerHTML = novaLi
}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
    mostrarTarefas()
}

button.addEventListener('click', adicionarNovaTarefa)

