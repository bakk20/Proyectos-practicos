// src/Components/RegisterScreen.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/LoginScreen.css"; // Puedes usar el mismo estilo que login
//import PageTransition  from "../Components/PageTransition";

export const RegisterScreen = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { name, email, password, age } = form;

    // Validación simple
    if (!name || !email || !password || !age) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error en el registro');
        setLoading(false);
        return;
      }

      // Registro exitoso
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='login-overlay'></div>
    {/*<PageTransition>*/}
    <div className="center-container">
      <form className='conainter login-container' onSubmit={handleSubmit}>
        <h2>Crea una cuenta</h2>
        <div >
        <label className='mb-3'  htmlFor="name">Nombre completo</label>
        <input
          type="text"
          name="name"
          className='form-control'
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          required
        />
        </div>
        <div>
        <label  className='mb-3' htmlFor="name">Correo electronico</label>
        <input
          type="email"
          name="email"
          className='form-control'
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        </div>
        <div>
        <label className='mb-3' htmlFor="age">Edad</label>
        <input
          type="number"
          name="age"
          className='form-control'
          placeholder="Edad"
          value={form.age}
          onChange={handleChange}
          required
        />
        </div>
        <div>
        <label className='mb-3'  htmlFor="name">Contraseña</label>
        <input
          type="password"
          name="password"
          className='form-control'
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button className='login-button' type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
                <p>¿Ya tienes una cuenta? <span onClick={() => navigate('/')}>Inicia sesión</span></p>

      </form>
      
    </div>
    {/*</PageTransition>*/}
    </>
  );
};