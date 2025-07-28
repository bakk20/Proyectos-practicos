import React from 'react'
import {useContexto} from 'react'
import {PasenContexto} from './PasenContexto'

export const Userjsx = () => {
    const{nombre} = useContexto(PasenContexto)

  return (
    <div>
        <h1>Aqui puedes ver el Nombre actual del usuario:</h1>
        <p>Un gusto conocerte {nombre}</p>
    </div>
  )
}
