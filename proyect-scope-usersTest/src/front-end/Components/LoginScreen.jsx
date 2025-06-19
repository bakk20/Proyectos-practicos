import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from '../hooks/useForm.js';
import { useLogin } from '../hooks/useLogin';
import "../styles/LoginScreen.css";
//import PageTransition from './PageTransition.jsx';

export const LoginScreen = ({ setIsLoggedIn }) => {

  const [isLoading, setIsLoading] = useState(false);

  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  });

  const { login } = useLogin({ setIsLoggedIn });
  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor llena los campos");
      return;
    }

    const result = await login({ email, password });

    if (!result.success) {
     alert(result.message || result.error);
    }
  };

  return (
    <>
    <div className='login-page-wrapper'>

    <div className='login-overlay'></div>
    {/*<PageTransition>*/}
    <div className='center-container'>
      <form className='container login-container' onSubmit={handleLogin}>
        <h2>Ingresar</h2>
        <div>
          <label className ="mb3-config" htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onInputChange}
            placeholder='Ingresa tu correo'
            required
          />
        </div>
        <div>
          <label className ="mb3-config"  htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onInputChange}
            placeholder='Ingresa tu contraseña'
            required
          />
        </div>
        <button type="submit" className="login-button">
            {isLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
        <p className=''>
          ¿No tienes cuenta?
          <Link to="/register"> Crea una cuenta aqui.</Link>
        </p>

        
      </form>
    </div>
    {/*</PageTransition>*/}
    </div>
    </>
  );
};