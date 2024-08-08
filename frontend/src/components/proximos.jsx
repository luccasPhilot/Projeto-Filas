function Proximo({ item, highlighted }) {
  return (
    <li className={`filas ${highlighted ? 'highlighted' : ''}`}>
      <div className="lugar">
        <p>{item.ordem}º</p>
      </div>
      <p>{item.text} | {item.codigo}</p>
      <img src="../public/img/Sino.png" alt="alerta" className="invert-on-hover" />
    </li>
  );
}

export default Proximo;