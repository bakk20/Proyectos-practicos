import { useState } from "react";
import { createUser } from "../api/adminAuth";

export const useCreateForm = (fetchAllUsers) =>{

  const[name, setName] = useState('')
  const[age, setAge] = useState(0)
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[role, setRole] = useState('user')

  const[creating, setCreating] = useState(false)

  const handleCreating = () =>{setCreating(true)}

  const handleCreateNewUser = async (e) =>{
    e.preventDefault()
    try{
        const formData = {
            name,
            age,
            email,
            password,
            role
        }
        if(name === '' || email === '' || password){
            alert('Campos incompletos!')
        }

        const newUser = await createUser(formData)
        console.log('Usuario creado!', name, age, email, role)

        setName('')
        setAge('')
        setEmail('')
        setPassword('')
        role('user')

        await fetchAllUsers()
    }catch(error){
        console.error('No se pudo crear usuario!')
    }
    }

    const handleExitCreating = () =>{
        setCreating(false)
    }

    return{
        handleCreating, 
        handleCreateNewUser, handleExitCreating,
        name, age, email, password, role,
        setName, setAge, setEmail, setPassword, setRole,
        creating, setCreating
    }
  }
