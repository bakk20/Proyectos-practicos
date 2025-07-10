import {useSelector, useDispatch} from '@reduxjs/toolkit'
import {useState} from 'react'
import {addTask, editTask, toggleTask, removeTask} from './TaskEditorSlice'

export const TaskEditor = () =>{

    const [input, setInput] = useState('')
    const [editId, setEditId] = useState(null)
    const [edit, setEdit] = useState('')
    const tasks = useSelector(task => state.tasks.tasks)
    const dispatch = useDispatch()

    const handleInput = () =>{
        if(input.trim()){
        setInput(addTask(input))
        setInput('')
        }
    }

    const handleEdit= () =>{
        if(edit.trim()){
            setEdit(editTask(edit))
            setEdit('')
        }
    }

    return(
        <>
        <div>
            <h1>Este Reducer tiene un taskList editable! D:</h1>
        </div>
        <div>
            <input value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder='Ingresa tu Tarea'></input>
            <button onClick={handleInput}>Agregar tarea</button>
        </div>
        <div>
            <ul>
                {tasks.map(task =>(
                    <li key={task.id} style={{textDecoration: task.completed ? 'line trough' : 'none'}}>
                        {editId === task.id ?(
                        <>
                        <input value ={edit} onChange ={e =>setEdit(e.target.value)}/>
                        <button onClick={() =>{ 
                        dispatch(editTask({id:task.id, newText:edit}));
                        setEditId(null);
                        setEdit('')}}>Aceptar</button>
                        </>
                        ) : (
                        <>
                    {task.text}
                    <button onClick={() => dispatch(toggleTask(task.id))}>
                    {task.completed ? 'Desmarcar' : 'Completar'}</button>
                    <button onClick={() =>{
                        setEditId(task.id)
                        setEdit(task.text)
                    }}>Editar</button>
                    <button onClick={() => dispatch(removeTask(task.id))}>Eliminar</button>
                    </>
                    )}
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}