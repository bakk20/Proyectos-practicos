import React from 'react'
import { useAuth } from '../context/AuthProvider'

export const adminScreen = () => {

  const {user, logout} = useAuth()
  return (
    <>
    <div>
      <h1>
        Bienvenido, {user.Name}
      </h1>
      <p>Tu rol es de: {user.role}</p>

      <button onClick={logout}>Cerrar Sesión</button>
    </div>
    </>
  )
}
