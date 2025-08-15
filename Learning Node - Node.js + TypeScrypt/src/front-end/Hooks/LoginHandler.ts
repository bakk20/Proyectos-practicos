import { useAuth } from "../context/AuthProvider";
import { UserLogin } from "../api/UserRoutes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginForm } from "../types/Forms";

export const LoginHandler = () =>{

     const {login} = useAuth()
      const [formData, setFormData] = useState<loginForm>({
        email:'',
        password:''
      })
    
      const navigate = useNavigate()
    
      const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormData({
          ...formData,
          [e.target.name] : e.target.value
        })
      }
    
      const handleLoginForm = async (e: React.FormEvent) =>{
        e.preventDefault()
        const {email, password} = formData
    
        try{
          if(!email || !password)
            {
            return alert('Llena los campos necesarios para iniciar sesión')
            }
        
        const res = await UserLogin(formData)
    
        if(res.token){
            login(res.token)
            navigate('/')
        }else{
          console.error('No se pudo leer el token creado')
          alert('Error al iniciar sesión')
        }
        
    
        }catch(error){
          if(error instanceof Error){
            console.error('Error al iniciar Sesión', error)
            alert('Error al iniciar Sesión')

          }
          else{
            console.error('Error desconocido', error)
          }
        }
      }

      return{
        formData, handleFormChange, handleLoginForm
      }
}