import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'


export const AdminRoute = () => {

  const {user} = useAuth()

  if(!user) return <Navigate to='/login'/>
  if(user.role === 'admin') return <Navigate to='/'/>
  
  return Children
  
}
