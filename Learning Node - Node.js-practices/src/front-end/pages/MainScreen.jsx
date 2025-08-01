import React from 'react'
import { useState, useEffect } from 'react'
import { getUserById } from '../api/adminAuth'

export const MainScreen = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem('token')
    if(!userId) return
    const fetchUser = async () =>{
    try{
      const user = await getUserById(userId)

      setUserData(user)
    }catch(error){
      console.error('No se pudo conseguir la informacion del usuario')
    }
  }
   fetchUser()
  }, [])

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
