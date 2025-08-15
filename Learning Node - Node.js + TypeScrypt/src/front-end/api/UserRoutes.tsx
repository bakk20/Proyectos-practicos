import axios  from "./Axiosconfig.ts";
import { AxiosErrorHandler } from "../utils/AxiosErrorHandler.ts";
import { loginForm, registerForm } from "../types/Forms.ts";
import axiosInstance from "./Axiosconfig.ts";

const API = "http://localhost:5000"

type loginRespone = {
    token:string
}

export const UserLogin = async (data: loginForm): Promise<loginRespone> =>{
    try{
        const res = await axiosInstance.post<loginRespone>(`/auth/login`, data)
        return res.data
    }catch(error){
        AxiosErrorHandler(error, 'UserLogin')
        throw error //En caso AxiosErrorHandler de undefined por algun motivo
    }
}

export const UserRegister = async (data: registerForm) =>{
    try{
    console.log('Llego al axios!')
    const res = await axiosInstance.post(`${API}/auth/register`, data)
    return res.data
    }catch(error){
        AxiosErrorHandler(error, 'UserRegister')
    }
}
