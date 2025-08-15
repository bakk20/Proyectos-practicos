import React from 'react'

export const DeleteUserData = () => {
  return (
    <>
    {IsDeleting &&(
        <>
        <p>¿Deseas Borrar este usuario?: </p>
        <p>Nombre:{userToDelete.name}</p>
        <p>Email:{userToDelete.email}</p>
        <p>Rol:{userToDelete.role}</p>
        <button onClick={handleconfirmDelete}>Confirmar</button>
        <button onClick={handleCancelDeleting}>Cancelar</button>
        </>
      )}
    </>
  )
}
