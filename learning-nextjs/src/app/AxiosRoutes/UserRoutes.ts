
/*
import api from "../lib/axiosConfig";
import { userLoginModel, fullUserModel, User, loginResponse } from "../types/GeneralTypes";


export const useLogin = async(data:User): Promise<User> =>{
    try{
        const res = await api.post<loginResponse>('/auth/login', data)

            if (!res.data.success) {
            throw new Error(res.data.message);
            }

        return { user: res.data.user, token: res.data.token };
    }catch(error){
        throw new Error('Error al hacer login')
    }
}

export const useRegister = async(data: fullUserModel): Promise<fullUserModel> =>{
    console.log('En register...', data)
    try{
        const res = await api.post<fullUserModel>('/auth/register', data)
        return res.data
    }catch(error){
        throw new Error('Error al hacer register')
    }
}
     */