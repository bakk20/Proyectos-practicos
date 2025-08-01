import React, { useEffect } from 'react'
import {useState} from 'react'
import { getUserById, getUsers, deleteUser, createUser } from '../api/adminAuth'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
export const AdminScreen = () => {

  const [userData, setUserData] = useState(null)
  const [showUsers, setShowUsers] = useState(false)
  const [generalData, setGeneralData] = useState(null)
  const {token, user, logout} = useAuth()

  const[name, setName] = useState('')
  const[age, setAge] = useState(0)
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[role, setRole] = useState('user')

  const[creating, setCreating] = useState(false)

  const navigate = useNavigate()

  //Llamando datos de usuario
  useEffect(() => {
    const fetchUserData =  async () =>{
      console.log('llamando datos de usuario')
      console.log(user)
      if(!token || !user?.id) return
    
    try{

      const data = await getUserById(user.id)
      setUserData(data)

    }catch(error){
      console.log('No se encontro al usuario', error)
      logout()
      navigate('/login')
    }
  }
  if(token && user?.id){
    fetchUserData()
  }
  }, [token, user])
  
  ///

  //Llamar a todos los usuarios

  const handleShowUsers = () =>{
    setShowUsers(true)
  }

  const handleHideUsers = () =>{
    setShowUsers(false)
    setGeneralData(null)
  }

  const handleCreating = () =>{
    setCreating(true)
  }

  const fetchAllUsers = async () =>{
    console.log('Llamando usuarios...')
    const allUsers = await getUsers()
    if(!allUsers){
      console.log('No se pudo llamar a la lista de usuarios!')
    }
    setGeneralData(allUsers)
  }

  useEffect(() => {
    if(!showUsers) return 
    fetchAllUsers()
  }, [showUsers])
  
  ///

  //Crear usuario
  const handleCreateUser = async (e) =>{
    e.preventDefault()
    try{
    const formData = {
      name,
      age,
      email,
      password,
      role
    }

    if(name === '' || email === '' || password===''){
      return alert('Campos necesarios vacios, llenalos antes de crear un usuario!')
    }

    if(password.length < 6){
      return alert('La contraseña no es lo suficientemente larga! (min. 6 Caracteres)')
    }

    console.log(formData)

    const created = await createUser(formData)

    console.log('Usuario creado!')

    setName('')
    setAge('')
    setEmail('')
    setPassword('')
    setRole('user')

    await fetchAllUsers()

    return 
    }catch(error){
      console.log('Error en al crear usuario!')
    }

  }

  //Crear Usuario


  //Eliminar usuario
  const handleDeleteUser = async (targetId) =>{
    try{
    const deleted = await deleteUser(targetId)
    console.log('Usuario eliminado')
    await fetchAllUsers()
    }catch(error){
      console.log('No se pudo eliminar usuario')
    }
  }
 
  //Cerrar Sesión
  const handleLogout = () =>{
    logout()
    navigate('/login')
  }


  if (!userData) return <><div><p>Cargando...</p></div></>
  
  return (
    <>
    <div>
      <h1>
        Bienvenido
      </h1>
      {(!userData ? (
      <>    
        <p>Los datos del usuario no fueron cargados correctamente!</p>

      </>
      ): ( 
      <>
      <div>
        <p>Tu nombre es: {userData.name}</p>
        <p>Tu rol es de: {userData.role}</p>
      </div>
      </>
    )
    )}

    <div>
      {!showUsers &&
      (<>
      <button onClick={handleShowUsers}>Mostrar usuarios</button>
      </>)}

      {!generalData && showUsers ? (
        <>
          <div> 
          <p>No se pudo cargar la lista de usuarios...</p>
          </div>
        </>
      ) : (
      <>
      <div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Correo</th>
                </tr>
              </thead>
                <tbody>
                {generalData?.map((u, index)=>(
                <tr key={u._id}>
                  <td>{index +1}</td>
                  <td>{u._id}</td>
                  <td>{u.name}</td>
                  <td>{u.age}</td>
                  <td>{u.email}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(u._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <button onClick={handleHideUsers}>Ocultaro usuarios</button>
        </div>
      </>
    )}
    </div>


    {!creating ?
    (<>
        <button  onClick={handleCreating}>Crear Usuario</button>
    </>
    ) : (
    <>
    <p>Ingrese los datos de usuario a crear: </p>
    <form onSubmit={handleCreateUser}>

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
      value={password} 
      onChange={(e) => setPassword(e.target.value)}></input>

      <p>Rol del usuario</p>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value='admin'>Administrador</option>
        <option value='user'>Usuario</option>
      </select>
      <button type='submit'>Aceptar</button>
    </form>
    <button></button>
    </>
  )}

      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
    </>
  )
}
