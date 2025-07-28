import { useState } from 'react'
import {useSelector, useDispatch} from '@reduxjs/toolkit'
import {addUser, editUser, toggleActive, removeUser} from './UserSlice'

export const User = () =>{
    const [uName, setUName] = useState ('')
    const [uEmail, setUEmail] = useState ('')
    const [uPassword, setUPassword] = useState ('')
    const [uEditId, setUEditId] = useState(null)

    const [editUName, setNewUName] = useState ('')
    const [editUEmail, setNewUEmail] = useState ('')
    const [editUPasword, setNewUPassword] = useState ('')

    const users = useSelector(user => state.users.users)
    const dispatch = useDispatch()


    const handleNewUser = (e) =>{
        e.preventDefault()
        if(uName.trim() && uEmail.trim() && uPassword.trim()){
            dispatch(addUser({
                name: uName, 
                email: uEmail, 
                password: uPassword}))
            setUName('')
            setUEmail('')
            setUPassword('')
        }
    }

    const handleEditUser = () =>{
        if(uEditId.trim()){
        setUEditId()
        }
    }

    return(
        <>
        <div>
            <h1>Este Redux Tiene usuarios!</h1>
        </div>
        <form onSubmit={handleNewUser}>
            <div>
                <p>Ingresa un nuevo usuario</p>
                <input value ={uName} placeholder='nuevo usuario' onChange={ e => setUName(e.target.value)}/>
                <input value ={uEmail} placeholder='Correo del usuario' onChange={e => setUEmail(e.target.value)}/>
                <input type= 'password' value={uPassword} placeholder='Contraseña usuario' onChange ={e => setUPassword(e.target.value)}/>
                <button type='submit'>Ingresar</button>
            </div>
        </form>


        <div>
            <ul>
                {users.map(user =>{
                    <li key ={user.id}>
                        {uEditId === user.id ?(
                        <>
                        <input value={editUName}placeholder='Edita el nombre'
                         onChange={e => setNewUName(e.target.value)}/>
                        <input value={editUEmail} placeholder='Edita el correo'
                        onChange={e => setNewUEmail(e.target.value)}></input>
                        <input  type='password' value={editUPasword} placeholder='Edita la contraseña'
                        onChange={e => setNewUPassword(e.target.value)}></input>
                        <button onClick={() =>{
                        dispatch(editUser({id:user.id, name: editUName, email: editUEmail, password: editUPasword}))
                        setUEditId(null)
                        setNewUName('')
                        setNewUEmail('')
                        setNewUPassword('')}}
                        >Aceptar</button>
                        </> ) :( <>
                            {user.name}
                            {user.email}
                            {user.name}
                        <button onClick={() => dispatch(toggleActive(user.id))}>
                        {user.active ? 'Activo' : 'Inactivo'}</button>
                        <button onClick={() => {
                            setUEditId(user.id)
                            setNewUName(user.name)
                            setNewUName(user.email)
                            setNewUName(user.password)}}>Editar Usuario</button>
                        
                        <button onClick={() => dispatch(removeUser(user.id))}>
                            Eliminar Usuario
                        </button>
                        </>
                        )}
                    </li>
                })}
            </ul>
        </div>
        </>
    )
}