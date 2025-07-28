import {useState} from 'react'

export const EjercicioBtn = () => {

    const[color, setColor] = useState('black')

    const handleOnClickBlue= () =>{
            setColor('blue')
    }
    const handleOnClickRed= () =>{
            setColor('red')
        
    }
    const handleOnClickYellow = () =>{
            setColor('yellow')
        
    }

  return (
    <>
    <div>
        <h1>Este boton cambia de color</h1>
        <button style={{ backgroundcolor: color , color:'white', fontsize:'1rem'}} ></button>
    </div>
    <div>
        <button onClick={handleOnClickBlue}>Azul </button>
        <button onClick={handleOnClickRed}>Rojo </button>
        <button onClick={handleOnClickYellow}>Amarillo </button>
    </div>
    </>
  )
}
