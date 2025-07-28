import React from 'react'
import { useState} from 'react'

export const UseToggle = () => {
    const [valor, setValor] = useState(true)

   const handleToggle = () =>{
        setValor(prev => !prev)
    }
  return {
    valor, setValor, handleToggle
    }
}
