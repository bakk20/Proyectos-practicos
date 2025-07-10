import React from 'react'
import {useEffect, useState} from 'react'

export const UseEffectComponent = () => {
    const [valor, setValor] = useState('')

    useEffect(() =>{
        console.log('Componente montado correctamente')
        setValor('Elemento Cargado!');
    return () =>{
            console.log('Error al cargar este componente!')
        }
    }, []);

  return (
    <div>
        <h1>Este componente usa UseEffect para detectar si el componente
             fue dibujado correctamente</h1>

        <p>{valor}</p>
    </div>
  )
}
