/* Usamos un input cambiante en tiempo real */


import {useState} from 'react'
/* Aunque es posible, no necesito usar un Prop para esta tarea
type Props = {
    Text: string
    text: string
}
*/
const Exercise6 = () =>{

    const [text, setText] = useState<string>('')

    //Wow leer un input es extraño en TS, pero debe ser por seguridad cierto?
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setText(e.target.value)
    }

    return(
        <>
        <div>
            <h1>Este componente cambia el texto en tiempo real!</h1>
        </div>
        <div>
            <p>Cambia el texto aqui:</p>
            <input placeholder='newtext' value={text} onChange={handleTextChange}></input>
        </div>
        <div>
            <p>El texto a mostrar es : {text}</p>
        </div>
        </>
    )
}