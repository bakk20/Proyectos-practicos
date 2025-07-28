import React from 'react'
import {UseFormulario} from './UseFormulario'

export const Formulario = () => {
 const{texto, numero, handleText, handleNum} = UseFormulario()

  return (
    <>
    <div>
        <h1>Este es un formulario que usa hooks para cambiar información</h1>
        <form>
            <input placeholder='Ingresa tu nombre aqui' value={texto} onChange={handleText}></input>
            <input placeholder='Ingresa un numero aqui' value={numero} onChange={handleNum}></input>
        </form>
    </div>
    <div>
        <h3>Y aqui vemos el resultado del hook:</h3>
        <p>Este es el texto ingresado:{texto} </p>
        <p>Este es el numero ingresado:{numero}</p>
    </div>
    </>
  )
}
