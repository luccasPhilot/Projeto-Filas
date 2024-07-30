function Proximo({ item }) {

  return (
    <li class="filas">
      <div class="lugar">
        <p>{item.ordem}º</p>
      </div>
      <p>{item.text} | {item.codigo}</p>
      <img src="../public/img/Sino.png" alt="alerta" class="invert-on-hover" />
    </li>
  )
}

export default Proximo