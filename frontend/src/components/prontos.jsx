function Pronto({ item, highlighted}) {

  return (
    <li className={`pedidos-prontos ${highlighted ? 'highlighted' : ''}`}>
      <p>{item.text}</p>
    </li>
  )
}

export default Pronto
