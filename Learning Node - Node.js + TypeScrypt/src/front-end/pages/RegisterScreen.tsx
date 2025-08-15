import React from 'react'
import { RegisterHandler } from '../Hooks/RegisterHandler'


export const RegisterScreen = () => {
    const{formData, handleChange, handleFormData} = RegisterHandler()
 return(
    <>
    <div className='w-full h-full flex flex-col items-center justify-center'>

        
        <div className='bg-[#52525250] rounded-[10px] flex flex-col items-center justify-center
                      min-w-[300px] max-w-[500px] min-h-[350px] ring-[1px] ring-[#5415E8]
                      shadow-[0_0_40px_10px_rgba(84,21,232,0.7)]'>
        <h1 className='text-[white] m-[5px]'>Registrate</h1>
            <form onSubmit={handleFormData}
            className='p-[5px] text-[15px] mt-20 flex flex-col items-center'>
                <p className='text-[20px] text-[white] m-[10px]'>Nombre</p>
                <input value={formData.name}
                name='name' 
                placeholder='Ingresa tu nombre' 
                onChange={handleChange}
                className='rounded-[5px]'/>

                <p className='text-[20px] text-[white] m-[10px]'>Email</p>
                <input value={formData.email} 
                name='email'
                type='email'
                placeholder='Ingresa tu correo' 
                onChange={handleChange}
                className='rounded-[5px]'/>

                <p className='text-[20px] text-[white] m-[10px]'>Contraseña</p>
                <input value={formData.password} 
                type='password'
                name='password'
                placeholder='Ingresa una contraseña'
                onChange={handleChange}
                className='rounded-[5px]'/>

                <p className='text-[20px] text-[white] m-[10px]'>Rol</p>
                <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className='rounded-[5px]'>
                <option value={'user'}>Usuario</option>
                <option value={'admin'}>Administrador</option>
                </select>
                <button type='submit' className='mt-[10px] hover:bg-[#5F3FD4] hover:text-[white] text-[#000000] rounded-[5px] transition-colors duration-300 ease-in-out'>Aceptar</button>
            </form>
        </div>
    </div>
    </>
 )
}
