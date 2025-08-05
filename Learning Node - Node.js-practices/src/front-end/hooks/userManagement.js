import { getUsers, deleteUser } from "../api/adminAuth";
import { useEffect, useState } from "react";

export const manageUsers = () =>{
      const [showUsers, setShowUsers] = useState(false)
      const [generalData, setGeneralData] = useState(null)


  const handleShowUsers = () =>{
    setShowUsers(true)
  }

  const handleHideUsers = () =>{
    setShowUsers(false)
    setGeneralData(null)
  }

    const fetchAllUsers = async () =>{
        try{
        console.log('Llamando usuarios...')
        const allUsers = await getUsers()
        if(!allUsers){
            return console.log('No hay usuarios para llamar!')
        }
        setGeneralData(allUsers)
        }catch(error){
            console.log('No se pudo llamar a la lista de usuarios!', error)
        }
    }

    useEffect(() => {
      if(showUsers){
        fetchAllUsers()
    }
    }, [showUsers])
    
    const handleDeleteUser = async (targetId) =>{
        try{
        console.log('Borrarndo al usuario de id:', targetId)
        const deleted = await deleteUser(targetId)
        if(deleted){
            console.log('Usuario elminado!')
            fetchAllUsers()
        }
        }catch(error){
            console.error('El usuario no pudo ser eliminado!', error)
        }
    }

    return{handleShowUsers, handleHideUsers, showUsers, setShowUsers, generalData, fetchAllUsers, handleDeleteUser}
}