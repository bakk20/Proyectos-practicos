
import { AdminController } from "../Hooks/AdminHandler"


export const AdminPanel = () => {

  const { isEditing, isCreating, IsDeleting, userToCreate, userToDelete, users, user, originalUser,
         activeEditTransition, activeteCreateTransition, activeteDeleteTransition, editExpand, createExpand,
        handleCancelDeleting, handleCancelEditing, handleCreateUser, handleCreatingUser, handleDeleting, handleEditing,
        handleFormCreateChange, handleFormEditChange, handleUpdateUser, handleconfirmDelete, handleCancelCreating} = AdminController()
  return (

    <>
    <div className="w-full h-full max-w-[1500px] max-h-[1000px] flex justify-center items-center mt-[100px]">
              <div className='bg-[#52525250] rounded-[10px] flex flex-col items-center justify-center
                      max-w-[850px] w-full max-h-[900px] h-full ring-[1px] ring-[#5415E8]
                      shadow-[0_0_40px_10px_rgba(84,21,232,0.7)]'>
          <div className="flex flex-col items-start w-full">
            <h1 className="text-[white] text-[3rem] m-[10px]">AdminPanel</h1>
            <p className="text-[white] m-[10px]">Herramientas de administrador:</p>
          </div>
          <div className="flex flex-row p-[20px] w-full h-full">
            <div className="bg-[#52525250]  rounded-[10px] 
                      flex flex-col items-center justify-center
                      max-w-[750px] max-h-[300px] m-[15px] p-[20px]
                      w-full h-full ring-[1px] ring-[#5415E8]
                      shadow-[0_0_40px_10px_rgba(16,40,150,0.7)]">
              <div className='bg-[#52525250]  rounded-[10px] 
                      flex flex-col items-center justify-center
                      max-w-[700px] max-h-[300px] m-[15px] p-[20px]
                      w-full h-full ring-[1px] ring-[#5415E8]
                      shadow-[0_0_40px_10px_rgba(16,40,150,0.7)] '>


                <p className="text-[white]">Usuarios</p>
                <table>
                  <thead>
                    <tr>
                      <th className="text-[white]">#</th>
                      <th className="text-[white]">id</th>
                      <th className="text-[white]">Nombre</th>
                      <th className="text-[white]">Correo</th>
                      <th className="text-[white]">Rol</th>

                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, index) => (
                      <tr key={index + 1}>
                        <td className="text-[white]">{index + 1}</td>
                        <td className="text-[white]">{u.id}</td>
                        <td className="text-[white]">{u.name}</td>
                        <td className="text-[white]">{u.email}</td>
                        <td className="text-[white]">{u.role}</td>
                        {!isEditing ? (
                          <td><button onClick={(e) => handleEditing(e, u)} className="text-[white]">Editar</button></td>
                        ) : <td></td>
                        }
                        {!IsDeleting &&
                          (<>
                            <td><button onClick={(e) => handleDeleting(e, u)} className={`text-[white] 
                            translation-all duration-300 ${activeteDeleteTransition ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>Borrar</button></td>
                          </>)}
                      </tr>
                    ))}
                  </tbody>

                </table>


              </div >
              <div className="w-full h-full flex justify-center">
                <div className="flex items-center justify-center w-full h-full">

                  {!IsDeleting ? 
                  (
                    <>
                    <div className="w-full h-full flex justify-center">
                      <div className={`bg-[#52525250] rounded-[10px] 
                        flex justify-center
                        w-full h-full  p-[20px]
                        max-w-[700px] max-h-[300px] ring-[1px] ring-[#E35B3D]
                        shadow-[0_0_40px_10px_rgba(227,91,61,0.7)]
                        transition-all duration-300 ${activeteDeleteTransition ? 
                        "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

                        <p className="text-[white]">Esperando usuario a borrar...</p>
                      </div>
                    </div>
                    </>
                  ) : (
                    <>
                    <div className="w-full h-full flex justify-center">
                      <div className={`bg-[#52525250] rounded-[10px] 
                      flex flex-row justify-center
                      w-full h-full  p-[20px]
                      max-w-[700px] max-h-[300px] ring-[1px] ring-[#E35B3D]
                      shadow-[0_0_40px_10px_rgba(227,91,61,0.7)]
                      transition-all duration-300 ${activeteDeleteTransition ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <div className="flex flex-col">
                          <div>
                            <p className="text-[white] m-[0px]">¿Deseas Borrar este usuario?: </p>
                          </div>
                          <div className="flex flex-row">
                            <p className="text-[#22c5e2] m-[5px]">Nombre:</p>
                            <p className="text-[white] m-[5px]">{userToDelete.name}</p>
                            <p className="text-[#22c5e2] m-[5px]">Email:</p>
                            <p className="text-[white] m-[5px]">{userToDelete.email}</p>
                            <p className="text-[#22c5e2] m-[5px]">Role:</p>
                            <p className="text-[white] m-[5px]">{userToDelete.role}</p>
                          </div>
                        </div>
                        <div className="flex flex-col m-[5px]">
                          <button onClick={handleconfirmDelete} className="text[white]">Confirmar</button>
                          <button onClick={handleCancelDeleting} className="text[white]">Cancelar</button>
                        </div>
                      </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>


        </div>
    </div>
      <div className="w-full h-full max-w-[1500px] max-h-[1000px] flex justify-center items-center mt-[100px]">

        <div className="bg-[#52525250]  rounded-[10px] 
                      flex flex-col items-center justify-center
                      max-w-[600px] max-h-[550px] m-[15px] p-[20px]
                      w-full h-full ring-[1px] ring-[#5415E8]
                      shadow-[0_0_40px_10px_rgba(16,40,150,0.7)]">
            <div className="flex flex-col m-[20px] items-center w-full h-full">
              <div className="m-[20px] w-full h-full flex items-center">
                <div className={`
    bg-[#52525250] rounded-[10px] flex flex-row items-center justify-center
    max-w-[600px] overflow-hidden
    ${activeEditTransition ? "max-h-[400px] opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4"}
    w-full m-[10px] p-[10px]
    ring-[1px] ring-[#5415E8] shadow-[0_0_40px_10px_rgba(49,179,204,0.7)]
    transition-all duration-300
  `}>
                  {!isEditing ? (
                    <>
                      <div>
                        <p className="text-[white]">Esperando usuario...</p>
                      </div>
                    </>

                  ) : (
                    <>
                      <div className="flex flex-col items-center">
                        <p className="text-[white]">Cambia los datos del usuario: </p>
                         <p className="text-[white] m-[0px]">Id: {user.id}</p>

                        <form onSubmit={handleUpdateUser} className="flex flex-row justify-center items-center ">
                          <div className="m-[10px]">
                            <p className="text-[white]">Cambiar Nombre:</p>
                            <input name='name'
                              type='string'
                              value={user.name}
                              placeholder='Nuevo nombre'
                              onChange={e => handleFormEditChange('name', e.target.value)} />

                            <p className="text-[white]">Cambiar Email:</p>
                            <input name='email'
                              type='email'
                              value={user.email}
                              placeholder='Nuevo Correo'
                              onChange={e => handleFormEditChange('email', e.target.value)} />
                          </div>
                          <div className="m-[10px]">
                            <p className="text-[white]">Cambiar Contraseña:</p>
                            <input name='password'
                              type='password'
                              value={user.password}
                              placeholder='Nueva Contraseña'
                              onChange={e => handleFormEditChange('password', e.target.value)} />

                            <p className="text-[white]">Cambiar Rol:</p>
                            <select name='role'
                              value={user.role} onChange={e => handleFormEditChange('role', e.target.value)}>
                              <option value={'user'}>Usuario</option>
                              <option value={'admin'}>Administrador</option>
                            </select>
                          </div>
                            <div className="flex flex-col">
                              <button type='submit'>Actualizar Usuario</button>
                              <button onClick={handleCancelEditing}>Cancelar</button>
                          </div>
                        </form>
                      </div>
                    </>)}
                </div>
              </div>
              <div className="m-[20px] w-full h-full flex items-center">
                <div className={`bg-[#52525250] rounded-[10px] flex flex-row items-center justify-center
                      max-w-[600px]${createExpand ? "max-h-[400px]" : "max-h-0"} w-full h-full m-[10px] p-[10px]
                      ring-[1px] ring-[#5415E8] shadow-[0_0_40px_10px_rgba(49,179,204,0.7)]
                      transition-all duration-300 ${activeteCreateTransition ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  {!isCreating ?
                    (<>
                      <div className='flex flex-col items-center'>
                        <p className="text-[white]">¿Quieres crear un usuario?</p>
                        <button onClick={handleCreatingUser}>Crear Usuario</button>
                      </div>
                    </>
                    ) : (
                      <>
                        <form onSubmit={handleCreateUser} className='flex flex-col items-center'>
                      <p className="text-[white] m-[0px]">Ingresa los datos para el usuario: </p>

                        <div className="flex flex-row items-center">

                          <div className="flex flex-col items-center m-[10px]">
                          <p className="text-[white]">Nombre del usuario</p>
                           <input name='name'
                            value={userToCreate.name}
                            onChange={handleFormCreateChange}
                            placeholder='Nombre de usuario' />

                          <p className="text-[white]">Correo del usuario</p>
                          <input name='email'
                            value={userToCreate.email}
                            onChange={handleFormCreateChange}
                            placeholder='Correo Electronico' />
                          </div>
                          <div className="flex flex-col m-[10px]">
                          <p className="text-[white]">Contraseña para el usuario</p>
                          <input name='password'
                            minLength={6}
                            value={userToCreate.password}
                            onChange={handleFormCreateChange}
                            placeholder='Contraseña del usuario' />

                          <p className="text-[white]">Rol del usuario:</p>
                          <select name='role' value={userToCreate.role} onChange={handleFormCreateChange}>
                            <option value={'user'}>Usuario</option>
                            <option value={'admin'}>Administrador</option>
                          </select>
                          </div>
                            <div className="w-full h-full flex flex-col items-center">
                              <button type='submit'>Crear</button>
                              <button onClick={() => handleCancelCreating}>Cancelar</button>
                            </div>
                          </div>
                        </form>
                        <br></br>
                      </>)}
                </div>
              </div>
            </div>
            </div>
      </div>
    </>

  )
}

