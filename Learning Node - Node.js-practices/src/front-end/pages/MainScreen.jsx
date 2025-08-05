import React from 'react'
import { useState, useEffect } from 'react'
import { getUserData } from '../hooks/getUserData'
import { getUserById } from '../api/adminAuth'

export const MainScreen = () => {
  
  const {userData, handleLogout} = getUserData()

  if(!userData) return <div><p>Cargando...</p></div>
  
  return (
    <>
    <div>
      <h1 style={{color:'red'}}>
        Esta es la pagina principal
      </h1>
      <p>A continuacion, la informacion del usuario:</p>
      <div>
        <p>Nombre de usuario: {userData.name}</p>
        <p>Edad: {userData.age}</p>
        <p>Correo: {userData.email}</p>
        <p>Rol: {userData.role}</p>
      </div>
    </div>
      </>
  )
}
