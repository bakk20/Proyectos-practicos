import {useState} from 'react'
import {useSelector, useDispatch} from '@reduxjs/toolkit'
import {addTask, toggleTask, removeTask} from './TodoSlice'

export const TodoList = () =>{

    const [input, setInput] = useState('')
    const tasks = useSelector(state => state.tasks.tasks)
    const dispatch = useDispatch()

    const handleAdd= () =>{
        if (input.trim()){
            dispatch(addTask(input))
            setInput('')
        }
    }

    return(
        <>
        <div>Esta es una lista que usa Redux</div>
        <div>
            <input value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Agrega una tarea'></input>
            <button onClick={handleAdd}>Agregar</button>
        </div>
        <div>
            <ul>
            {tasks.map(task =>(
                <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none'}}>
                    {task.text}
                    <button onClick={() => dispatch(toggleTask(task.id))}>
                    {task.completed ? 'Desmarcar' : 'Completar'}</button>
                    <button onClick={() => dispatch(removeTask(task.id))}>Elimnar</button>
                </li>
            ))}
            </ul>
        </div>
        </>
    )
}