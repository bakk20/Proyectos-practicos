import React from 'react'
import { UseToggle } from './UseToggle'

export const Toggle = () => {

    const {valor, handleToggle } = UseToggle()

  return (
    <div>
        <h1>Este componente usa una funcion toggle para mostrar contenido</h1>
        {valor && <p>Este parrafo puede ocultarse y mostrarse a propia desicion
             y el boton de abajo provoca eso</p>}

        <button onClick={handleToggle}>Mostrar/Ocultar contenido</button>
    </div>
  )
}
