import React from 'react'
import {useState} from 'react'

export const EjercicioBtn2 = (color,setColor) => {

const handleColor= (option) =>{
        setColor(option)
        console.log(`El ultimo color elegido fue ${color}`)
}

return (
    <>
    <div>
        <h1>Este programa detecta el ultimo color elegido</h1>
        <p>Elige un color</p>
        <button onClick={()=>handleColor('blue')}>Azul</button>
        <button onClick={()=>handleColor('Red')}>Rojo</button>
        <button onClick={()=>handleColor('Yellow')}>Amarillo</button>
        </div>
    <div>
        
        <p>El ultimo color elegido fue:</p>
        <p style={{color: color}}>{color}</p>
    </div>
    <div>EjercicioBtn2</div>
    </>
  )
}
