import React from 'react'
import { useCreateForm } from '../hooks/createNewUser'

export const CreateUsersForm = () => {

      //Crear usuario
    const {creating, setCreating, handleCreating,  handleCreateNewUser, handleExitCreating,
    name, setName, age, setAge, email, setEmail, password, setPassword, role, setRole} = useCreateForm()

  return (
    <>
    {!creating ?
    (<>
        <button  onClick={handleCreating}>Crear Usuario</button>
    </>
    ) : (
    <>
    <p>Ingrese los datos de usuario a crear: </p>
    <form onSubmit={handleCreateNewUser}>

      <p>Ingrese el nombre de usuario:</p>
      <input value={name} 
      onChange={(e) => setName(e.target.value)}></input>

      <p>Ingrese la edad del usuario {`(opcional)`}: </p>
      <input type ='number'
      value={age} 
      onChange={(e) => 
      setAge(e.target.value)}></input>

      <p>Ingrese el correo del usuario</p>
      <input type ='email' 
      value={email} 
      onChange={(e) => setEmail(e.target.value)}></input>

      <p>Ingrese la contraseña del usuario</p>
      <input  type ="password" 
      value={password} minLength={6}
      onChange={(e) => setPassword(e.target.value)}></input>

      <p>Rol del usuario</p>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value='admin'>Administrador</option>
        <option value='user'>Usuario</option>
      </select>
      <button type='submit'>Aceptar</button>
    </form>
    <button onClick={handleExitCreating}>Cerrar formulario</button>
    </>
  )}
    </>
  )
}
