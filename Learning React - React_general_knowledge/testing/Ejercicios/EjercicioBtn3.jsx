import React from 'react'
import {useState} from 'react'
import {EjercicioBtn2} from './EjercicioBtn2'

export const EjercicioBtn3 = () => {
      const [color, setColor] = useState('')

const handleReset= (option) =>{
    setColor('')
    console.log('reiniciando color al original')
    //supongo que usar white tambien serviria?
}
    return (

    <>
    <div>
        <EjercicioBtn2/>
        <button onClick={handleReset}>Reiniciar Color</button>
    </div>
    </>
  )
}
