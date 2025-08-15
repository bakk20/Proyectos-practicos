import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export const NavBar = () => {
  const[isAdmin, setIsAdmin] =useState<boolean>(false)
const [toggleActive, setToggleActive] = useState<string>('mainscreen')
  const {logout, user} = useAuth()

  useEffect(() => {
    setIsAdmin(user?.role === 'admin')
  }, [user])
  

  return (
    <div className='w-full flex flex-row justify-end bg-[#2d2d2d]'>
      <div className='flex flex-row '>
        <NavLink to='/' >
          <button onClick={() => setToggleActive('mainscreen')}
          className={`text-[#ffffff] w-[80px] h-[40px] flex justify-center items-center hover:bg-[#5415E8] transition-colors duration-300 ease-in-out
            ${toggleActive === 'mainscreen' ? `bg-[#5415E8]` : `bg-[#2d2d2d]`} `}>Inicio</button>
        </NavLink>
        {isAdmin && (
          <NavLink to='/admin'>
            <button onClick={() => setToggleActive('admin')}
            className={`text-[#ffffff] w-[80px] h-[40px] flex justify-center items-center hover:bg-[#5415E8] transition-colors duration-300 ease-in-out
            ${toggleActive === 'admin' ? `bg-[#5415E8]` : `bg-[#2d2d2d]`} `}>AdminPanel</button>
          </NavLink>
        )}
        <NavLink to='/login'>
          <button onClick={(logout)} className='text-[#ffffff] w-[80px] flex justify-center items-center h-[40px] bg-[#2d2d2d] hover:bg-[#5415E8] transition-colors duration-300 ease-in-out'>Salir</button>
        </NavLink>
      </div>
    </div>
  )
}
