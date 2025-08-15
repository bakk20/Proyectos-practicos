import React, { useState, useEffect } from 'react'
import { UserSchema, registerForm} from '../types/Forms'
import { createNewUser, deleteUser, getAllUsers, updateUserData } from '../api/AdminRoutes'

export const AdminController = () =>{
      const [editExpand, setEditExpand] = useState<boolean>(false)
      const [createExpand, setCreateExpand] = useState<boolean>(false)
      const [activeEditTransition, setActiveEditTransition] = useState<boolean>(true)
      const [activeteCreateTransition, setActiveCreateTransition] = useState<boolean>(true)
      const [activeteDeleteTransition, setActivateDeleteTransition] = useState<boolean>(true)
      const [isEditing, setIsEditing] = useState<boolean>(false)
      const [IsDeleting, setIsDeleting] = useState<boolean>(false)
      const [isCreating, setIsCreating] = useState<boolean>(false)
      const [userToCreate, setUserToCreate] = useState<registerForm>({
        name:'',
        email:'',
        password:'',
        role:'user'
      })
      
      const [userToDelete, setUserToDelete] = useState<UserSchema>({
        id:'',
        name:'',
        email:'',
        password:'',
        role:'user'
      })
      const [users, setUsers] = useState<UserSchema[]>([])
      const [user, setUser] = useState<Partial<UserSchema>>({
        id:'',
        name:'',
        email:'',
        password:'',
        role:'user'
      })
      const [originalUser, setOriginalUser] = useState<UserSchema | null>(null)

      
      useEffect(() => {    
        const fetchAllUsers = async () =>{
        try{
          const data = await getAllUsers()
          if(data){
            const mappedUsers = data.map(user =>({
              ...user, id: user.id
            }))
    
            setUsers(mappedUsers)
          }
        }catch(error){
              return console.error('No se pudo conseguir la lista de usuarios')
        }
      }
        fetchAllUsers()
    
      }, [isEditing, isCreating, IsDeleting])
    
      
  
    
      const handleEditing = (e: React.MouseEvent<HTMLButtonElement>, userToEdit: UserSchema) => {
        setActiveEditTransition(false)
        setEditExpand(false)

        setTimeout(() => {
          setIsEditing(true)
          setUser(userToEdit)
          setOriginalUser(userToEdit)

          setEditExpand(false)
          setActiveEditTransition(false)

          requestAnimationFrame(() => {
            setEditExpand(true)
            setActiveEditTransition(true)

          })
        }, 300)
      };
          
    
      const handleFormEditChange = (field: keyof UserSchema, value: string) => {
        setUser(prev => ({ ...prev, [field]: value }))
      }
    
    
      const handleUpdateUser = async (e: React.FormEvent) =>{
        e.preventDefault()
        if(!originalUser) return
    
        const dataToUpdate: Partial<UserSchema> = {}
    
        for (const key in user){
          const k = key as keyof UserSchema
          if(
            user[k] !== originalUser[k] &&
            user[k] !== ''
          ){
            dataToUpdate[k] = user[k]
          }
        }
    
        if (!originalUser.id) {
        console.error("No se encontró el id del usuario");
        return;
        }
        
        if(Object.keys(dataToUpdate).length > 0){
          const Updated = await updateUserData(dataToUpdate, originalUser.id!)
          console.log('Usuario Actualizado', Updated)
          alert('Usuario Actualizado')
          setIsEditing(false)
        }
      }
    
        const handleCancelEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
          setActiveEditTransition(false)
          setEditExpand(false)
          setTimeout(() => {
            setIsEditing(false)

            setEditExpand(false)
            setActiveEditTransition(false)

            requestAnimationFrame(() => {
              setEditExpand(true)
              setActiveEditTransition(true)
            })
          }, 300)
        };
    
      const handleDeleting = async (e: React.MouseEvent<HTMLButtonElement>, AboutToDelete: UserSchema) =>{
        setActivateDeleteTransition(false)
        setTimeout(() =>{
            setUserToDelete(AboutToDelete)

            setIsDeleting(true)
            setActivateDeleteTransition(false)

            requestAnimationFrame(() => setActivateDeleteTransition(true))
        }, 300)
      }
      const handleconfirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) =>{
        if(userToDelete){
          const userDeleted = await deleteUser(userToDelete.id)
          console.log('Usuario eliminado', userDeleted)
          alert('Usuario Eliminado')
          setIsDeleting(false)
          return
        }
        return console.log('No hay usuario para borrar (No se encontro id)')
      }
      const handleCancelDeleting = (e: React.MouseEvent<HTMLButtonElement>) =>{
        setActivateDeleteTransition(false)
        setTimeout(() =>{
        setIsDeleting(false)
        setActivateDeleteTransition(false)
        requestAnimationFrame(() => setActivateDeleteTransition(true))
        }, 300)
      }
    
      const handleCreatingUser = (e: React.MouseEvent<HTMLButtonElement>) =>{
        setCreateExpand(false)
        setActiveCreateTransition(false)
        setTimeout(() =>{
           setIsCreating(true)

           setCreateExpand(false)
           setActiveCreateTransition(false)

           requestAnimationFrame(() => {
            setCreateExpand(true)
            setActiveCreateTransition(true)
           })
        }, 300)
      }
    
      const handleFormCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setUserToCreate({...userToCreate, [e.target.name] : e.target.value })
      }
    
      const handleCreateUser = async (e: React.FormEvent) =>{
          e.preventDefault()
          console.log('Intenando crear usuarios...',userToCreate)
    
          try{

            if(userToCreate){
              if(userToCreate.email === '' || userToCreate.name === '' || userToCreate.password === '')
                {
                console.log('Creacion de usuario cancelada...')
                setActiveCreateTransition(false)
                setTimeout(() =>{
                  setIsCreating(false)

                  setCreateExpand(false)
                  setActiveCreateTransition(false)

                  requestAnimationFrame(() => {
                    setCreateExpand(true)
                    setActiveCreateTransition(true)
                  })
                }, 300)
                return 
              }
              const created = await createNewUser(userToCreate)
              alert('Usuario creado exitosamente')
              setIsCreating(false)
              return 
              }
            }catch(error){
              console.error('No se pudo crear el usuario')
              throw error
            }
      }
      
      const handleCancelCreating = (e: React.MouseEvent<HTMLButtonElement>) =>{
        setCreateExpand(false)
        setActiveCreateTransition(false)

        setTimeout(() =>{
          setIsCreating(false)

          setCreateExpand(false)
          setActiveCreateTransition(false)

          requestAnimationFrame(() => {
            setCreateExpand(true)
            setActiveCreateTransition(true)
          })
        }, 300)
      }

      return{
         isEditing, isCreating, IsDeleting, userToCreate, userToDelete, users, user, originalUser,
        activeEditTransition, activeteCreateTransition, activeteDeleteTransition, editExpand, createExpand,
         handleCancelDeleting, handleCancelEditing, handleCreateUser, handleCreatingUser, handleDeleting, handleEditing,
        handleFormCreateChange, handleFormEditChange, handleUpdateUser, handleconfirmDelete, handleCancelCreating
      }
}