import { useState } from 'react'
import { UserRegister } from '../api/UserRoutes'
import { registerForm } from '../types/Forms'

export const RegisterHandler = () =>{

        const [formData, setFormData] = useState<registerForm>({
            name:'',
            email:'',
            password:'',
            role:'user'
        })
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
            setFormData({
                ...formData,
                [e.target.name] : e.target.value
            })
        }
    
        const handleFormData = async (e: React.FormEvent) =>{
            try{
                
            e.preventDefault()
            if(!formData.name || !formData.email || !formData.password || !formData.role ){
                return (console.error('Llene todos los campos'),
                        alert('Llena todos los campos') )
            }
            await UserRegister(formData)
            setFormData({
                name:'',
                email:'',
                password:'',
                role:'user'
            })
            }catch(error){
                if(error instanceof Error){
                    console.error('Error al registar el usuario!', error)
                }
                else{
                    console.error('Error desconocido', error)
                }
            }
    
        }

        return{
            formData, handleChange, handleFormData
        }
}