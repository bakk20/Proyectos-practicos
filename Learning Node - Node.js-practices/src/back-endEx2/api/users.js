import axios from "axios";

export const getAllUsers = async () =>{
    const res = await axios.get('/users')
    return res.data
}

export const getUserById = async (id) =>{
    const res = await axios.get(`/users/${id}`)
    return res.data()
}
export const updateUser = async (id, data) =>{
    const res = await axios.put(`/users/${id}`, data)
    return res.data() 
}
export const deleteUser = async (id) =>{
    const res = await axios.delete(`/users/${id}`)
    return res.data()
}

