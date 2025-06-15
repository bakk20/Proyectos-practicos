import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/LoginScreen.css";

export const LoginScreen = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Por favor llena los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Guarda el token en localStorage para futuras validaciones
        localStorage.setItem("token", data.token);

        // Actualiza estado de login
        setIsLoggedIn(true);

        // Redirige a la pantalla principal
        navigate('/mainscreen', { replace: true });

        console.log("Inicio de sesión correcto");
      } else {
        alert(data.message || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <>
      <div className='fit-content login-color-config'>
        <div>
          <div className='Container'></div>
          <form className='container login-container' onSubmit={handleLogin}>
            <div>
              <h2>Ingresar</h2>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Ingresa tu correo'
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Ingresa tu contraseña'
                required
              />
            </div>
            <button type="submit" className="login-button">Ingresar</button>
          </form>
        </div>
      </div>
    </>
  );
};