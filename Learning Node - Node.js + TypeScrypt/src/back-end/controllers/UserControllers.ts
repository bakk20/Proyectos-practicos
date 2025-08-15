import { Request, Response } from "express";
import { User } from "../models/User.ts";
import bcrypt from 'bcrypt'

interface UserData {
    'name': string,
    'email': string,
    'password': string,
    'role': 'user' | 'admin'
}

export const getAllUsers = async (req :Request , res: Response) => {
    try{
    const user = await User.find().select('-password')
    if(!user){
        return res.status(404).json({
            message:'Error en el proceso: GetAllUsers: No se encontro ningun usuario'})
    }

    res.json(user)
    }catch(error){
        if( error instanceof Error){
            res.status(500).json({
            message:'Error en el proceso - GetAllUsers: El sistema no pudo leer a los usuarios',
            error: error.message})
        }
        else{
            console.error('Error en el proceso - GetAllUsers: Error desconocido', error)
        }    }
}

export const getUserDataById = async (req: Request, res: Response) =>{
    try{
        console.log('En GetUserDataById...')
    const {id} = req.params as {id:string}
    const user = await User.findById(id).select('-password')
    if(!user){
        return res.status(404).json({
            message:'Error en el proceso - GetUserDataById: No se encontro al usuario'})
    }
    res.json(user)
    }catch(error){
        if( error instanceof Error){
            res.status(500).json({
            message:'Error en el proceso - GetUserDataById: El sistema no pudo leer los datos del usuario', 
            error: error.message})
        }
        else{
            console.error('Error en el proceso - GetUserDataById: Error desconocido', error)
        }    }
}

export const updateUserData = async (req: Request<{id:string}, {}, Partial<UserData>>, res: Response) =>{
    try{
        console.log('Llego al backend...')
    const {id} = req.params
    const update = req.body
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({
            message:'Error en el proceso - updateUserData: No se encontro al usuario'})
    }

    Object.assign(user, update)
    
    await user.save()
    res.status(200).json(user)
    
    }catch(error){
        if( error instanceof Error){
            res.status(500).json({
            message:'Error en el proceso - updateUserData: El sistema no pudo actualizar al usuario', 
            error:error.message})
        }
        else{
            console.error('Error en el proceso - updateUserData: Error desconocido', error)
        }
    }
}

export const createUser = async (req: Request< {} ,{}, UserData>, res:Response) =>{
    const {name, email, password, role} = req.body
    console.log('Llego a createUser en Backend...')
    try{        
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:'Error en el proceso - createUser: Ya existe un usuario con ese correo'})
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const create = new User ({
            name,
            email,
            password: hashedpassword,
            role
        })

        await create.save()
        res.status(201).json({
            message:'Usuario creado exitosamente', 
            'name': name,
            'email': email,
            'role': role
        })
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                message:'Error en el proceso - createUser: Crear usuario',
                error: error.message
            })
        }
        else{
            console.error('Error desconocido', error)
        }
    }
}

export const deleteUser = async (req: Request<{}, {}, {}>, res: Response ) =>{
    try{
        const {id} = req.params as {id: string}
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({
                message:'Error en el proceso - deleteUser: Usuario no encontrado'
            })
        }
        res.json({message:'Usuario eliminado', user})
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                message:'Error en el proceso - deleteUser: El sistema no pudo borrar al usuario',
                error: error.message
            })
        }
        else{
            console.error('Error en el proceso - deleteUser: Error desconocido', error)
        }
    }
}
