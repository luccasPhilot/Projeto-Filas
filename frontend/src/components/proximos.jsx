function Proximo({ item }) {

  return (
    <li class="filas">
      <div class="lugar">
        <p>{item.posicao}º</p>
      </div>
      <p>{item.text}</p>
      <img src="../public/img/Sino.png" alt="alerta" class="invert-on-hover" />
    </li>
  )
}

export default Proximo