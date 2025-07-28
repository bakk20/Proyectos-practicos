import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin@gmail.com');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      sessionStorage.setItem('adminToken', res.data.token);
      sessionStorage.setItem('isAdmin', 'true');

      setMensaje('Sesión iniciada');
      setTimeout(() => {
        navigate('/catalog');
      }, 1000);
    } catch (err) {
      setMensaje(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login de Administrador</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label><br />
        <input
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <label>Contraseña:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};