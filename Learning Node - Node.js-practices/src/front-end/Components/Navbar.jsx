import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        <NavLink to='/'>
        <button>Inicio</button>
        </NavLink>
        <NavLink to='/login'>
        <button>Ingresar</button>
        </NavLink>
        <NavLink to='/register'>
        <button>Registrate</button></NavLink>
    </div>
  )
}
