import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaCode, FaInfoCircle, FaRobot } from 'react-icons/fa'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggleSidebar = () => setCollapsed(!collapsed)

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
  <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
  <nav>
    <NavLink to="/" end data-tooltip="Home"><FaHome /></NavLink>
    <NavLink to="/about" data-tooltip="About"><FaInfoCircle /></NavLink>
    <NavLink to="/proyectos" data-tooltip="Proyectos"><FaCode /></NavLink>
    <NavLink to="/ricksito" data-tooltip="Ricksito"><FaRobot /></NavLink>
  </nav>
</div>
  )
}

export default Sidebar