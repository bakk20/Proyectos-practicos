import {Request, Response} from 'express'
import { UserModel } from '../models/UserModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {z} from 'zod'



export const loginSchema = z.object({
    email: z.email('El correo no es valido'),
    password: z.string().min(6, "La contraseña debe contener al menos 6 caracteres")
})

export const registerSchema = z.object({
    username: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.email("El correo no es valido"),
    password: z.string().min(6,"La contraseña debe tener al menos 6 caracteres" )
}) 

//---UserLogin---
export const userLogin = async (req:Request, res: Response) =>{
    const parsed = loginSchema.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json({
            success:false,
            errors: parsed.error.issues.map(issue =>({
                field: issue.path.join(''),
                message: issue.message
            }))
        })
    }
    const {email, password} = parsed.data
    try{
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(409).json({
                success : false,
                errors: [
                    {"field": "email" , message: 'No se encontro una cuenta que use este correo'}
                ]
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                success: false,
                errors:[
                    {"field": "password", message:'La contraseña no coincide'}
                ]
            })
        }

        const token = jwt.sign({_id:user._id, email: user.email}, process.env.JWT_SECRET as string,
            {expiresIn: '1h'}
        )


        return res.status(200).json({ 
            success:true,
            message:'Inicio de sesión exitoso',
            user: {id: user._id, email: user.email},
            token
        })
    }catch(error){
        if(process.env.NODE_ENV==="development"){
            console.error(error)
            return res.status(500).json({
                succes:false,
                message: 'Error interno al hacer login',
                error: (error as Error).message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Error interno al hacer login"
        })
    }
}

//---UserRegister---
export const userRegister = async (req:Request , res: Response) =>{
    console.log('En el register...')
    const parsed = registerSchema.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json({
            success:false,
            errors: parsed.error.issues.map(issue =>({
            field: issue.path.join('.'),
            message: issue.message
            })
        )})
    }
    const {username, email, password} = parsed.data

    console.log('Usando register...', 
        parsed.data)
    try{
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(409).json({
                "success": false,
                "errors": [{field : "email", message:'Error en el campo email'}]
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10)

        const newUser = new UserModel({
            username: username,
            email: email,
            password: hashedpassword
        })

        await newUser.save()
        return res.status(201).json({
            "success" : true,
            message:'Usuario registrado correctamente',
            username: username,
            email: email
        })

    }catch(error){
        if(process.env.NODE_ENV === 'development'){
            return res.status(500).json({
                success:false,
                message:'Error interno al usar el register - Err1',
                error: (error as Error).message
            })
        }

        return res.status(500).json({
            success:false,
            message:'Error interno al usar register'
        })
    }
}