import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from '@reduxjs/toolkit'
import {increment, decrement, incrementByAmount, decrementByAmount} from '.ContadorLogSlice'

export const CounterLog = () =>{
    const [numero, setNumero] = useState=(0)
    const dispath= useDispatch()
    const valor = useSelector(state => state.counterLog.target)
    const historial = useSelector(state =>state.customCounter.history)
    
    const handleInput = () => setNumero(Number(numero))
    const handleIncrementByAmount = () =>(incrementByAmount(numero))
    const handleDecrementByAmount = () =>(decrementByAmount(numero))

    return(
        <>
        <div>Este counter tiene un historial</div>
        <div>
            <button onClick={() => useDispatch(increment())}></button>
            <button onClick={() => useDispatch(decrement())}></button>
            <input type='number' onChange={handleInput}></input>
        </div>
        <div>
            <button onClick={handleIncrementByAmount}>Sumar valor</button>
            <button onClick={handleDecrementByAmount}>Restar valor</button>
        </div>

        <div>
            <p>El valor actual es:{valor}</p>
            <ul>
                {historial.map((item,i) => <li key={i}>{item}</li>)}
            </ul>
        </div>
        </>
    )
}