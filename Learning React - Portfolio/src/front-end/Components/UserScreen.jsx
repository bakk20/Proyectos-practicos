import React, { useEffect, useState } from 'react';
import '../styles/GeneralStyles.css';
//import PageTransition from './PageTransition.jsx';

const UserScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p className="card-text">Cargando información del usuario...</p>;
  }

  return (
    <>
    {/*<PageTransition>*/}
      <div className='grouping-card'>
        <div className="component-card">Aquí irá la barra de navegación del perfil</div>

        <div className="profile-component-card">
          <h2 className='card-title'>Información de Usuario</h2>
          <p className='card-text'>Revisa tu información de usuario</p>

          <div className='profile-grid'>
            <div className='profile-card'>
              <h4 className='card-title profile-card-title'>Nombre completo</h4>
              <p className='card-text'>{user.name}</p>
            </div>
            <div className='profile-card'>
              <h4 className='card-title profile-card-title'>Correo electrónico</h4>
              <p className='card-text'>{user.email}</p>
            </div>
            <div className='profile-card'>
              <h4 className='card-title profile-card-title'>Edad</h4>
              <p className='card-text'>{user.age}</p>
            </div>
            {/* Puedes seguir agregando más campos si el usuario los tiene */}
          </div>
        </div>
      </div>
      {/*</PageTransition>*/}
    </>
  );
};

export default UserScreen;