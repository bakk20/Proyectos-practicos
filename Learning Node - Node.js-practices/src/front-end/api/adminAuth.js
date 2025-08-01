import axios from './axiosConfig'
const API = 'http://localhost:5000'

export const getUsers =async () =>{
    try{
    const res = await axios.get(`/auth/users`)
    return res.data
    }catch(error){
        alert('Error al llamar la lista de usuarios', error)
        throw error
    }
}

export const getUserById = async (id) =>{
    try{
        const res = await axios.get(`/auth/user/${id}`)
        return res.data
    }catch(error){
        alert('Error al llamar al usuario, error')
        throw error
    }
}

export const createUser = async (formData) =>{
    try{
        const res = await axios.post('/auth/user/create', formData)
        return res.data
    }catch(error){
        alert('No se pudo crear usuario.', error)
        throw error
    }
}

export const deleteUser = async(id) =>{
    try{
        const res = await axios.delete(`/auth/delete/${id} `)
        return res.data
    }catch(error){
        alert('Error al elminar el usuario', error)
        throw error
    }
}


