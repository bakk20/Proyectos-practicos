import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth'

export const RegisterScreen = () => {
  const[name, setName] = useState('')
  const[password, setPassword] = useState('')
  const[email, setEmail] = useState('')
  const[role, setRole] = useState(null)

  const navigate = useNavigate

  const handleRegister = async () =>{

    try{
      if(password.length < 5){
        return alert('La contraseña debe ser de mas de 5 caracteres')
      }
      const newUser = await registerUser({
        name,
        email,
        password,
        role
      })
      navigate('/login')
      console.log('Regresando al Login...')
    }catch(error){
      console.log('Error al crear al usuario', error)
      alert(error.respondes.data?.error || 'Error en el registro')
    }
  }

  return (
    <>
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <p>Nombre de usuario</p>
        <input placeholder='Su nombre Aqui' value={name} onChange={ e => setName(e.target.value)}></input>
        <p>Correo Electronico</p>
        <input required type='email' placeholder='Su correo Aqui' value={email} onChange={e => setEmail(e.target.value)}></input>
        <p>Contraseña</p>
        <input minLength={5} required type='password' placeholder='Su contraseña' value={password} onChange={e => setPassword(e.target.value)}></input>
        <p>Elije un Rol</p>
        <select required value={role || ''} onChange={e => setRole(e.target.value)}>
          <option value='user'>Usuario</option>
          <option value='admin'>Administrador</option>
        </select>
        <button type='submit'>Aceptar</button>
      </form>
    </div>
    </>
  )
}
