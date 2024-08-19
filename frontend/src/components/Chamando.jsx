function Chamando({ item }) {

    return (
      <li className='chamando'>
        <p>{item.text}</p>
        <p>{item.codigo}</p>
      </li>
    )
  }
  
  export default Chamando
  