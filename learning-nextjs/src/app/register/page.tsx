'use client'
import React from 'react'
import { useState } from 'react'
import { useRegister } from '../AxiosRoutes/UserRoutes'
import { useRouter } from 'next/navigation'
import Link from 'next/link' 

interface UserSchema{
    username: string,
    email:string,
    password:string
}
export default function RegisterPage (){
    const[formData, setFormData] = useState<UserSchema>({
        username:'',
        email:'',
        password:''
    })
    const router = useRouter()

    const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData(prev => ({
            ...prev,
            [e.target.name] : e.target.value 
        }))
    }

    const handleRegister = async (e: React.FormEvent) =>{
        e.preventDefault()
        try{
            if(formData.email ==='' || formData.username === '' || formData.password === ''){
                alert('Llene los campos necesarios!')
                return
            }
            const res = await useRegister(formData)
            alert('Register exitoso!')
            router.push('/')
        }catch(error){
            console.log(error)
            alert('Error al registarse, error interno')
        }
    }
    
  return (
        <div className='w-full h-full flex items-center justify-center'>
            <div className="flex items-center flex-col justify-center p-4 ring-1 h-fit w-fit rounded-2xl ring-neutral-600">
                <div className="ring-1 ring-cyan-950 p-4 rounded-2xl">
               <h1 className='text-4xl'>Registrate</h1>
                <form className="flex flex-col items-start"
                    onSubmit={handleRegister}>
                    <label>
                    <p>Username</p>
                    <input type='text'
                        maxLength={50}
                        name='username'
                        placeholder='Your name here'
                        onChange={handleFormDataChange}
                    ></input>
                    </label>
                    <label>
                    <p>Email</p>
                    <input type='email'
                        name='email'
                        placeholder='Your email here'
                        onChange={handleFormDataChange}></input>
                    </label>
                    <label>
                    <p>Password</p>
                    <input type='password'
                        name='password'
                        minLength={6}
                        placeholder='Your password here'
                        onChange={handleFormDataChange}></input>
                    </label>

                    <button type='submit'>Register</button>
                    <p>Have an account already?
                     <br/>
                        <Link href={'/'} className="text-cyan-700 hover:underline">
                        Go back to login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
}
