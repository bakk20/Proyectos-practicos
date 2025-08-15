import axios from './Axiosconfig.ts'
import { AxiosErrorHandler } from "../utils/AxiosErrorHandler.ts";
import { registerForm, UserSchema } from '../types/Forms.ts';


export const getAllUsers = async (): Promise<UserSchema[]> =>{
    try{
        const res = await axios.get<UserSchema[]>('/auth/users')
        return res.data
    }catch(error){
        AxiosErrorHandler(error, 'getAllUsers')
        throw Error('getAllUsers failed!')
    }
}

export const getUserData = async (id: string): Promise<UserSchema> =>{
    try{
        const res = await axios.get<UserSchema>(`/auth/user/${id}`)
        return res.data
    }catch(error){
        AxiosErrorHandler(error, 'getUserData')
        throw Error('getUserData failed!')
    }
}

export const updateUserData = async (updateData: Partial<UserSchema>, id:string): Promise<UserSchema> =>{
    try{
        console.log('Llego al update...')
        const res = await axios.patch<UserSchema>(`/auth/user/update/${id}`, updateData)
        return res.data
    }catch(error){
        AxiosErrorHandler(error, 'updateUserData')
        throw error
    }
}

export const createNewUser = async (createData: registerForm): Promise<registerForm>=>{
    try{
    const res = await axios.post<registerForm>('/auth/user/create', createData)
    return res.data
    }catch(error){
        AxiosErrorHandler(error, 'createNewUser')
        throw error
    }
}

export const deleteUser = async (id: string) =>{
    try{
        const res = await axios.delete(`/auth/user/delete/${id}`)
        return res.data
    }catch(error){
        AxiosErrorHandler(error, 'deleteUser')
    }
}