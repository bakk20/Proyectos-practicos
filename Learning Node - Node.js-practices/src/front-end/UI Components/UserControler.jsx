import React from 'react'
import { manageUsers } from '../hooks/userManagement'

export const UserControler = () => {

    //Llamar a todos los usuarios y eliminar Usuarios
    const {showUsers, setShowUsers, generalData, fetchAllUsers, handleDeleteUser, handleShowUsers, handleHideUsers} = manageUsers()
    
  return (
    <>
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
                {generalData && (
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
                )}
              </thead>
                <tbody>
                {generalData?.map((u, index)=>(
                <tr key={u._id}>
                  <td>{index +1}</td>
                  <td>{u._id}</td>
                  <td>{u.name}</td>
                  <td>{u.age}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(u._id)}>Delete</button>
                  </td>
                </tr>
                
              ))}
              </tbody>
            </table>
              {generalData && ( <><div>
               <button onClick={handleHideUsers}>Ocultar usuarios</button>
                </div></>)}
            <div>
            </div>
        </div>
      </>
    )}
    </>
  )
}
