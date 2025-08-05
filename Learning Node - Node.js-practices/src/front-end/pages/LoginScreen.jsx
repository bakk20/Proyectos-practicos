import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/auth.js'
import { useAuth } from '../context/AuthProvider.jsx'
import  {jwtDecode}  from 'jwt-decode'

export const LoginScreen = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) =>{
    e.preventDefault()
    try{
      
      const {token} = await loginUser(email, password)
      console.log(token)
      const decoded = jwtDecode(token)
      const role = decoded?.role
      const id = decoded?.id
      login(token, id)

      if(role === 'admin'){
        navigate('/admin')
      }
      else{
          navigate('/index')
      }

    }catch(error){
      console.log('Error al inciar sesion: ', error)
      alert('Credenciales invalidas o error del servidor')
    }
  }
  return (
    <>
    <div>
      <h1>Bienvenido!</h1>
      <p>Ingrese sus datos</p>

      <div>
        <form onSubmit={handleLogin}>
          <p>Correo electronico</p>
          <input
          placeholder='Su correo aqui'
          value={email}
          type='email'
          onChange={(e) => setEmail(e.target.value)}>
          </input>

          <p>Contraseña</p>
          <input
          placeholder='Su contraseña'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}></input>

          <button type='submit'>Ingresar</button>
        </form>
      </div>
    </div>
    </>
    
  )
}
