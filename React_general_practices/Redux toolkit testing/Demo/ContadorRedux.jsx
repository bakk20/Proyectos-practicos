import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from './ContadorSlice';

export const ContadorRedux = () => {
    //El estado flujo es estado -> counter -> value, de modo que se pasa el estado al counter(reducer) y este
    //se remite al slice, indetificando con el nombre de counter, y por ultimo se altera el value en "counter"
    const valor =useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    //usames dispatch para remitire la orden
  return (
    <div>
        <h2>Contador Redux</h2>
        <button onClick ={() => dispatch(increment())}>+1</button>
        {/* -dispatch te ordena ejecutar increment con el parametro(sin especificar)-*/ }
        <button onClick ={() => dispatch(decrement())}>-1</button>
    </div>
  )
}
