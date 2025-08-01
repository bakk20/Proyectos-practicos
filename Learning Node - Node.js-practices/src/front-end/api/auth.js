import axios from "axios";

const API = "http://localhost:5000"

export const loginUser = async (email, password) =>{
    const res = await axios.post(`${API}/auth/login`, {email, password})
    return res.data
}

export const registerUser = async (formData) =>{
    const res = await axios.post(`${API}/auth/register`, formData)
    return res.data
}

export const updateUser = async (id) =>{
    const res = await axios.post(`${API}/auth/update/${id}`)
    return res.data
}
