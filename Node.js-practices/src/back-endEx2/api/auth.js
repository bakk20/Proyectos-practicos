import axios from "axios";

const API = "https/localhost:5000"

export const loginUser = async (email, password) =>{
    const res = await axios.post(`${API}/auth/login`, {email, password})
    return res.data()
}

export const registerUser = async (formData) =>{
    const res = axios.post(`${API}/auth/register`, formData)
    return res.data()
}
