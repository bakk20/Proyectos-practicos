import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import{
  AboutScreen,
  CatalogScreen,
  MainScreen,
  AddContent,
  LoginScreen,
  Layout
} from './front-end/rutas/routes'
import './App.css'

import React from 'react'

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        {/*Rutas de administrador*/}
        <Route path='addcontent' element={<AddContent/>} />
        <Route path='adminlogin' element={<LoginScreen/>} />
        {/*Rutas publicas*/}
        <Route path='/' element={<MainScreen />} />
        <Route path='aboutus' element={<AboutScreen />} />
        <Route path='catalog' element={<CatalogScreen />} />
        {/*No se encontraron rutas*/}
        <Route path='*' element={<Navigate to='/MainScreen' replace />} />
      </Route>
    </Routes>
  )
}

