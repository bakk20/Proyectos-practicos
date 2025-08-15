import React from 'react'
import { LoginHandler } from '../Hooks/LoginHandler'
import { Link } from 'react-router-dom'
import colors from 'tailwindcss'

export const LoginScreen = () => {
  const {formData, handleFormChange, handleLoginForm} = LoginHandler()

  return (
    <>
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='bg-[#52525250] rounded-[10px] flex flex-col items-center justify-center
                      min-w-[300px] max-w-[500px] min-h-[350px] ring-[1px] ring-[#5415E8]
                      shadow-[0_0_40px_10px_rgba(84,21,232,0.7)]'>
      <h1 className='m-[0px] text-[white]'>Iniciar Sesión</h1>
      <div>
        <form onSubmit={handleLoginForm}
        className='p-[5px] text-[15px] mt-20 flex flex-col items-center'>
          <p className='text-[20px] text-[white] m-[10px]'>Correo del usuario</p>
          <input type='email'
            name='email'
            value={formData.email} 
            placeholder='Ingresa tu correo'
            onChange={handleFormChange}
            className='rounded-[5px]'></input>

          <p className='text-[20px] m-[10px] text-[white]'>Contraseña</p>
          <input type='password'
            name='password'
            value={formData.password}
            placeholder='Ingresa tu contraseña'
            onChange={handleFormChange}
            className='rounded-[5px]'></input>

            <button type='submit' className='mt-[10px] hover:bg-[#5F3FD4] hover:text-[white] text-[#000000] rounded-[5px] transition-colors duration-300 ease-in-out'>Ingresar</button>
            <p className='text-[15px] text-[white]'>¿Aun no tienes una cuenta?,  <Link to={'/register'} className='text-[#5415E8]'>Creala Aqui</Link></p>
        </form>
      </div>
      </div>
    </div>
    </>
  )
}
