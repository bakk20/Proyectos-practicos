import React from 'react'
import {useState} from 'react'

export const UseFormulario = () => {
    const [texto, setTexto] = useState('')
    const [numero, setNumero] = useState('')

    const handleText= (e) =>{    
        setTexto(e.target.value)
    }
    const handleNum= (e) =>{
        e.preventDefault()
        setNumero(e.target.value)
    }
  return (
    texto, numero, handleText, handleNum
  )
}
