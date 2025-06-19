import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUser, FaHome, FaCode, FaExclamation, FaDoorClosed } from 'react-icons/fa'

const Sidebar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const toggleSidebar = () => setCollapsed(!collapsed)

const handleLogout = () => {
if (confirm("¿Seguro que quieres cerrar sesión?")) {
  localStorage.removeItem('token');
  localStorage.removeItem('user')
  setIsLoggedIn(false);
  setTimeout(() => navigate('/', { replace: true }), 0);
}
};

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
  <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
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
  )
}

export default Sidebar