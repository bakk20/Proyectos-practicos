import React from 'react'
import Sidebar from './Sidebar.jsx'
import '../styles/Layout.css'

export const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="app-layout">
      <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

