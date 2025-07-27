import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './front-end/context/authProvider.jsx'
import {BrowserRouter} from 'react-router-dom'
import {App} from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthProvider>
  </React.StrictMode>
)
