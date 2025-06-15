import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUser, FaHome, FaCode, FaExclamation, FaDoorClosed } from 'react-icons/fa'

const Sidebar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const toggleSidebar = () => setCollapsed(!collapsed)

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/', { replace: true }) // redirige a login al cerrar sesión
  }

  return (
    <div className={`sidebar-order ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar contenedor */}
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <nav>
          <NavLink to="/mainscreen" data-tooltip="Home"><FaHome /></NavLink>
          <NavLink to="/aboutscreen" data-tooltip="About"><FaExclamation /></NavLink>
          <NavLink to="/devcodessection" data-tooltip="Dev Codes"><FaCode /></NavLink>
          <NavLink to="/userprofile" data-tooltip="User Profile"><FaUser /></NavLink>
          {isLoggedIn && (
            <button onClick={handleLogout} className="logout-button" data-tooltip="Logout">
              <FaDoorClosed />
            </button>
          )}
        </nav>
      </div>

      {/* Botón fuera de la sidebar */}
      <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
    </div>
  )
}

export default Sidebar