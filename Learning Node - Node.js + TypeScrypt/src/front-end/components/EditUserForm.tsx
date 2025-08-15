import React from 'react'

export const EditUserForm = () => {
  return (
    <>
     {isEditing &&(
        <>
        <div>
          <p>Cambia los datos del usuario: </p>
          <form onSubmit={handleUpdateUser}>
            <p>Id: {user.id}</p>
            <input name='name'
            type='string' 
            value={user.name}
            placeholder='Nuevo nombre'
            onChange={e => handleFormEditChange('name', e.target.value)}/>

            <input name='email'
            type='email'
            value={user.email}
            placeholder='Nuevo Correo'
            onChange={e => handleFormEditChange('email', e.target.value)}/>

            <input name='password'
            type='password'
            value={user.password}
            placeholder='Nueva Contraseña'
            onChange={e =>handleFormEditChange('password', e.target.value)}/>

            <select name='role'
            value={user.role} onChange={e => handleFormEditChange('role', e.target.value)}>
              <option value={'user'}>Usuario</option>
              <option value={'admin'}>Administrador</option>
            </select>
            <div>
             <button type='submit'>Actualizar Usuario</button>
             <button onClick={handleCancelEditing}>Cancelar</button>
            </div>
          </form>
        </div>
        </>
      )}
    </>
  )
}
