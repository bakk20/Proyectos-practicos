import React from 'react'
import {useState, useEffect} from 'react'

export const ContadorUseEffect = () => {
    const [contador, setContador] = useState(0)


    const handleContador = (option) =>[
        setContador(prev => prev + option)
    ]

    //Cuando el contador Aumente
    useEffect(() => {
      console.log(`Contador aumento!, el numero actual es: ${contador}`)
    }, [contador])

    //Verificar que el Componente se monto bien
    useEffect(() => {
      console.log('Componente montado y listo!')
    
      return () => {
        console.log('Componente mal montado!')
      }
    }, [])
    
  return (
    <>
    <div>
        <h1>Este Programa es un contador con doble useEffect</h1>
    </div>
    <div>
        <p>El contador puede subir en numeros y tambien bajar, segun tu lo decidas claro</p>
        <p>El numero actual es : {contador}</p>
    </div>
    <div>
        <button onClick={() => handleContador(1)}>+1</button>
        <button onClick={() => handleContador(-1)}>-1</button>
    </div>
    </>
  )
}
