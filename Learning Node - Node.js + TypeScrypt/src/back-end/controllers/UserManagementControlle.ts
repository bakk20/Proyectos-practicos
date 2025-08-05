import bcrypt from 'bcrypt'
import { User } from '../models/User'
import  jwt  from 'jsonwebtoken'
import {Response, Request, NextFunction} from 'express'

const JWT_SECRET = process.env.JWT_SECRET
const loginError = 'Error en el proceso - Login:'
const registerError = 'Error en el proceso - Register'

interface loginForm {
    email: string,
    password: string
}

interface registerForm{
    name: string,
    email: string,
    password: string,
    role: string
}


export const UserLogin = async (req: Request<{},{},loginForm>, res: Response) =>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message: `${loginError} Usuario no encontrado!`
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message: `${loginError} Contraseña Incorrecta!`
            })
        }

        if(!process.env.JWT_SECRET){
            return res.status(400).json({
                message: `${loginError} JWT_SECRET no esta definido correctamente`
            })
        }

        const token = jwt.sign({
            id: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h'})

        res.json({
            message:'Inicio de Sesión exitoso!',
            'Nombre': user.name,
            'Correo': user.email,
            'Rol' : user.role
        })
    }catch(error){
        if( error instanceof Error){
            res.status(500).json({
                message: `${loginError}, El sistema no pudo ejecutar el inicio de sesión`,
                error: error.message
            })
        }
    }
}

export const UserRegister = async (req: Request<{},{}, registerForm>, res:Response) =>{
    try{
        const {name, email, password, role} = req.body

        const formData = await User.findOne({email})
        if(formData){
            return res.status(400).json({
                message:`${registerError} Error en el proceso - UserRegister: Ya hay un usuario creado con ese correo`
            })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const register = new User({
            name: name,
            email: email,
            password: hashpassword,
            role: role
        })

        await register.save()
        res.json({
            message:'Usuario Creado exitosamente!',
            'Nombre' : name,
            'Email': email,
            'Rol': role
        })

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                message: `${registerError} Error en el proceso - UserRegister: El sistema no pudo crear el usuario`,
                error: error.message
            })
        }
    }
}