import {Router} from 'express'

export function formDataController(req, res, next) {
    const{edad, rol} = req.body
    
    const router = Router()

    if(!edad || !rol){
            const error = new Error('Datos invalidos')
            error.StatusCode = 422
            return next(error)
    }
    res.json({mensaje: `Edad: ${edad} y el Rol: ${rol}`})
}