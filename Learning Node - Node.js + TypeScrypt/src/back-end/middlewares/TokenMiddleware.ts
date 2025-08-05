import  jwt  from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express'

interface CustomUser{
    id:string,
    role: 'user' | 'admin'
}

export interface AuthenticateRequest extends Request{
    user?: CustomUser
}
export const validateUser = (req: AuthenticateRequest, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            message:'Error en proceso - TokenAuth: No se encontro ningun Token'
        })
    }

    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomUser
        
        req.user={
            id: decoded.id,
            role: decoded.role
        }
        next()
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                message:'Error en proceso - TokenAuth:  Decifrado del token',
                error: error.message
            })
        }
        else{
            console.error('Error en proceso - TokenAuth: Error desconocido', error)
        }
    }
}