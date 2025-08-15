import {Request, Response, NextFunction} from 'express'
import { User } from '../models/User.ts'

interface AuthUser{
    id:string,
    role:string
}
interface AuthRequest extends Request {
    user?: AuthUser
}


 export const verifyRole = async (req: AuthRequest, res: Response, next: NextFunction ) =>{
    try{

    if(!req.user){
        return res.status(404).json({
            message:'No se encontro un usuario'
        })
    }

    if(req.user.role === 'admin' || req.user.id === req.params.id){
            return next()
    }

    return res.status(403).json({message:'El usuario no tiene los permisos para usar esta funcion'})

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                message:'Error en el proceso - IsAdminMiddleware: No se pudo verificar usuario',
                error: error.message
            })
        }
        else{
            console.log('Error en el proceso - IsAdminMiddleware: No identificado', error)
        }
    }
}
