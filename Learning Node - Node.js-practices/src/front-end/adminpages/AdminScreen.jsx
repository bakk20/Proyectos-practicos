import React, { useEffect } from 'react'
import {useState} from 'react'
import { getUserData } from '../hooks/getUserData'
import { UserControler } from '../UI Components/UserControler'
import { useNavigate } from 'react-router-dom'
import { CreateUsersForm } from '../UI Components/CreateUsersForm'
export const AdminScreen = () => {

   //Llamando datos de usuario
  const { userData, handleLogout } = getUserData()
  //
  const navigate = useNavigate()

  if (!userData) return <div><p>Cargando...</p></div>
  
  return (
    <>
    <div>
      <h1>
        Bienvenido
      </h1>
      <div>
        <p>Tu nombre es: {userData.name}</p>
        <p>Tu rol es de: {userData.role}</p>
      </div>
    <div>
      <UserControler/>
    </div>
    <div>
      <CreateUsersForm/>
    </div>

  <div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
  </div>
    </div>
    </>
  )
}
