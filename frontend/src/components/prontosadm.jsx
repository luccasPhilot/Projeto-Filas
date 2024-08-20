import {useState} from "react"

function Item({ item, updateDocument, deleteDocument, updateFila, updateVoltar }) {
  const [tempText, setTempText] = useState(item.text)

  return (
    <li className="filas"
      style={{
        backgroundColor: item.ordem===-1 ? "#e3e971" : (item.ordem===0 ? "#B17A5B" : "#dbdbdb")
      }}
    >
      <div className="lugar">
        <p>{item.ordem}º</p>
      </div>
      
      {((item.edit) || (item.text === "")) 
        ?
        <input 
          className="filas-content"
          value={tempText}
          type="text" 
          onChange={(e) => {setTempText(e.target.value)}}
          onBlur={
            () => {updateDocument({...item, text: tempText, edit: false})
            setTempText(tempText)
          }}
        />
        :
        <span 
          className="filas-content"
          onClick={() => {updateDocument({ ...item, edit: true })}}
        >{item.text}</span>
      }
      
      <p
        className="filas-codigo"
      >{item.codigo}</p>

      <div className="buttons">
        {(item.ordem === 0 || item.ordem === -1) && (
          <button className="btn voltar"
          onClick={() => {updateVoltar({ ...item, active: !item.active })}}
          >voltar</button>
        )}

        <button className="btn del" onClick={() => {(deleteDocument(item))}}>Apagar</button>
        
        <button className="btn chamar" onClick={() => {updateFila(item)
        }}
        >Chamar</button>
      </div>
    </li>
  )
}

export default Item