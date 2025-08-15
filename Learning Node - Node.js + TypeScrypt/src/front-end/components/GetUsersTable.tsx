
export const GetUsersTable = () => {
  return (
    <>
     <p>Usuarios</p>
      {!callingUsers ? 
      (
        <>
        <button onClick={handleCallingUsers}>Mostrar lista de usuarios</button>
        </>
      ):
      (
      <>
      <table>
        <thead>
          {callingUsers && (
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>

          </tr> 
      )}
        </thead>
        <tbody>
    {users.map((u, index) =>(
      <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td><button onClick={(e) => handleEditing(e, u)}>Editar</button></td>
            {!IsDeleting &&
            (<>
            <td><button onClick={(e) => handleDeleting(e, u)}>Borrar</button></td>
            </>)}
      </tr>
        ))}
        </tbody>

      </table>
      <div>
      <button onClick={handleHideUsers}>Ocultar Lista</button>
      </div>
      </>
      )}
    </>
  )
}
