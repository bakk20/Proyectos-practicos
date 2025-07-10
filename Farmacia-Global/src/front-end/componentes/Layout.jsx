import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import  Navbar  from '../componentes/Navbar'
import Footer from "../componentes/Footer.jsx"

export const Layout = () => {
  return (
<>
      <div className='app-layout'>
        <Navbar />
        <main className='main-content'>
          <Outlet />
        </main>
          
      </div>
      
      <Footer />

</>
  
)
}
