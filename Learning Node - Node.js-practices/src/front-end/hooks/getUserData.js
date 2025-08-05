import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getUserById } from "../api/adminAuth";

export const getUserData = () =>{
    const {token, user, logout} = useAuth()
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()


  useEffect(() => {
      const fetchUserData = async () =>{
        try{
        if(!user?.id || !token) return
        const data = await getUserById(user.id)
        setUserData(data)
        }catch(error){
            console.log('No se pudo llamar al usuario', error)
            logout()
            navigate('/login')
        }
    }
    if(token && user?.id){
        fetchUserData()
    }
}, [token, user])

  const handleLogout = () =>{
    logout()
    navigate('/login')
  }

return {userData, handleLogout}


}