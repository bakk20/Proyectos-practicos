import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import "../styles/LoginScreen.css"
export const LoginScreen = ({setIsLoggedIn}) => {
    

    const navigate =useNavigate()

    const[email, setEmail] =useState('')
    const[password, setPassword] =useState('')


    const handleLogin =(event) =>{
        event.preventDefault()

        if(!email || !password){
        alert("Por favor llena los campos")
        return;
        }
        setIsLoggedIn(true)
        navigate('/mainscreen', {replace: true})

        console.log("inicio de sesión correto...")
    }

  return (
    <>
        <div  className='fit-content login-color-config'>
            <div>
                <div className='Container'>

                </div>
            <form className='container login-container' onSubmit={handleLogin}>
                <div>
                    <h2>Ingresar</h2>
                </div>
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" >Correo Electronico </label>
                      <input type="email"
                       className="form-control"
                        id="exampleInputEmail1"
                        value={email}
                        onChange={(e) =>setEmail(e.target.value)}
                        placeholder='Ingresa tu correo'
                        aria-describedby="emailHelp"
                        required/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                      <input type="password"
                       className="form-control"
                       placeholder='Ingresa tu contraseña'
                       id="exampleInputPassword1"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                  </div>
                  <button type="submit" className="login-button">Ingresar</button>
              </form>
              </div>
        </div>
    </>
  )
}

