import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../context/AuthProvider'

export const Navbar = () => {
  const {logout} = useAuth()
  return (
    <div>
        <NavLink to='/'>
        <button onClick={logout}>Inicio</button>
        </NavLink>
        <NavLink to='/login'>
        <button onClick={logout}>Ingresar</button>
        </NavLink>
        <NavLink to='/register'>
        <button onClick={logout}>Registrate</button></NavLink>
    </div>
  )
}
