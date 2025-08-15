import React from 'react'

export const CreateUserForm = () => {
  return (
    <>
      {!isCreating ? 
    (<>
      <button onClick={handleCreatingUser}>Crear Usuario</button>
      </>
    ) : (
    <>
      <p>Ingresa los datos para el usuario: </p>
      <form onSubmit={handleCreateUser}>
      <p>Nombre del usuario</p>
      <input name='name' 
      required
      value={userToCreate.name} 
      onChange={handleFormCreateChange} 
      placeholder='Nombre de usuario'/>

      <p>Correo del usuario</p>
      <input name='email'
      required 
      value={userToCreate.email} 
      onChange={handleFormCreateChange} 
      placeholder='Correo Electronico'/>

      <p>Contraseña para el usuario</p>
      <input name='password'
      required
      minLength={6}
      value={userToCreate.password}
      onChange={handleFormCreateChange}
      placeholder='Contraseña del usuario'/>

      <p>Rol del usuario:</p>
      <select name='role' value={userToCreate.role} onChange={handleFormCreateChange}>
        <option value={'user'}>Usuario</option>
        <option value={'admin'}>Administrador</option>
      </select>
      <button type='submit'>Crear</button>

      </form>
      <br></br>
      <button onClick={handleCreatingUser}>Cancelar</button>
    </>) }
    </>
  )
}
