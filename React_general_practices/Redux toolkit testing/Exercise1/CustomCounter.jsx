import React from 'react'
import {useState} from 'react'
import {useSelector, useDispatch} from '@reduxjs/toolkit'
import {increment, decrement, incrementByAmount, decrementByAmount} from './CustomCounterSlice'

export const CustomCounter = () => {
    const[numero, setNumero] = useState = (0)
    const dispatch = useDispatch()
    const valor = useSelector(state => state.customCounter.value)

    const handleInput = (e) => setNumero(Number(e.target.value))
    const handleIncrementByAmount = () => dispatch(decrementByAmount(numero));
    const handleDecrementByAmount = () => dispatch(decrementByAmount(numero));

    
  return (
    <>
    <div>
        <h1>Este programa usa redux para agregar un contador, el cual tambien
            puede ser modificado con un numero a eleccion manualmente!
        </h1>
        <div>
            <button onClick={() => dispatch(increment())}>+1</button>
            <button onClick={() => dispatch(decrement())}>-1</button>
            <input type="number" value ={numero} onChange={handleInput} placeholder='Agrega un numero'></input>
            <button  onClick={handleIncrementByAmount}>Suma este numero</button>
            <button  onClick={handleDecrementByAmount}>Resta este numero</button>
        </div>
        <p>El valor actual es: {valor}</p>
    </div>
    </>
  )
}
