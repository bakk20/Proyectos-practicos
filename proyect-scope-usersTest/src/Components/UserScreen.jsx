import React from 'react'
import '../styles/GeneralStyles.css'


const UserScreen = () => {
  return (
      <>
      <div className='grouping-card'>
      <div className="component-card"> Aqui ira la barra de navegacion del perfil</div>
      

        <div className="profile-component-card">
         <h2 className='card-title'>Informacion de Usuario</h2>
        <p className='card-text'>Revisa tu Informacion de usuario</p>
        {/*Informacion de usuario*/}
        <div className='profile-grid'>
          <div className='profile-card'>
            <h4 className='card-title profile-card-title'>Kevin Vilchez Nuñez</h4>
            <p className='card-text'>paolito</p>
          </div>
          <div className='profile-card'>
            <h4 className='card-title profile-card-title'>Correo Electronico</h4>
            <p className='card-text'>@nodogsky@gmail.com</p>
          </div>
          <div className='profile-card'>
            <h4 className='card-title profile-card-title'>Numero de celular</h4>
            <p className='card-text'>922149458</p>
          </div>
          <div className='profile-card'>
            <h4 className='card-title profile-card-title'>Nacionalidad</h4>
            <p className='card-text'>Peruano</p>
          </div>
          <div className='profile-card'>
            <h4 className='card-title profile-card-title'>---</h4>
            <p className='card-text'>---</p>
          </div>
        </div>
      </div>
      </div>
      </>
  )
}

export default UserScreen
