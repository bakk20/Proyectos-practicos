import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { jwtDecode } from 'jwt-decode'
import { getUserData } from '../api/AdminRoutes'
import { UserSchema } from '../types/Forms'


export const MainScreen = () => {
  const {user} = useAuth()
  const [userData, setUserData] = useState<UserSchema | null>(null)

  useEffect(() => {
    const fetchUser = async() =>{
      if(user){
        const data = await getUserData(user.id)
        setUserData(data)
      }
    }
    fetchUser()
  }, [user])
  
  return (
    <>
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='w-[100vh] h-[100vh] flex items-center justify-center'>
      <div className='bg-[#52525250] rounded-[10px] flex flex-col items-center justify-center
                      min-w-[300px] min-h-[250px] ring-[1px] ring-[#5415E8]
                      shadow-[0_0_40px_10px_rgba(84,21,232,0.7)]'>
        <h1 className='m-[10px] text-[white]'>¡Bienvenido!</h1>
        <div>
          <p className='text-[20px] m-[10px] text-[white]'>Nombre: {userData?.name}</p>
          <p className='text-[20px] m-[10px] text-[white]'>Email: {userData?.email}</p>
          <p className='text-[20px] m-[10px] text-[white]'>Rol: {userData?.role}</p>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
