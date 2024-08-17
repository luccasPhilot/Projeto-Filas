import {useState} from "react"

function Item({ item, updateDocument, deleteDocument, updateFila, updateVoltar }) {

  const [tempText, setTempText] = useState("")
  const chamado = item.active

  if (!chamado) {
    return (
      <li class="filas"
        style={item.active ? {} : { backgroundColor: "#B17A5B" }}
      >
        <div class="lugar">
          <p>{item.ordem}º</p>
        </div>
        
        {((item.edit) || (item.text === "")) 
          ?
          <input 
            type="text" 
            placeholder={item.text} 
            onChange={(e) => {setTempText(e.target.value)}}
            onBlur={() => {updateDocument({...item, text: tempText, edit: false})}}
          />
          :
          <span 
            onClick={() => {updateDocument({ ...item, edit: true })}}
          >{item.text}</span>
        }
        
        <p>{item.codigo}</p>
  
        <button className="del" onClick={() => {(deleteDocument(item))}}>Apagar</button>
        
        <button className="chamar" onClick={() => {updateFila(item)
        }}
        >Chamar</button>

        <button className="voltar"
          onClick={() => {updateVoltar({ ...item, active: !item.active })
        }}>
          voltar</button>
      </li>
    )
  }
}

export default Item