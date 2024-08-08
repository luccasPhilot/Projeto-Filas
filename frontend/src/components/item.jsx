import {useState} from "react"

function Item({ item, updateDocument, deleteDocument }) {

  const [tempText, setTempText] = useState("")

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
      
      <input type="checkbox" checked={!item.active} onClick={() => { updateDocument({ ...item, active: !item.active }) }}/>
    </li>
  )
}

export default Item