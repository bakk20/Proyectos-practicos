import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const ValidateFormData = (dtoClass: any) =>{
    return async (req:Request, res:Response, next: NextFunction) =>{
        const instance = plainToInstance(dtoClass, req.body)
        const errors = await validate (instance)


        if(errors.length > 0 ){
            return res.status(400).json({
                message:'Datos invalidos',
                errors: errors.map(e => ({
                    property: e.property,
                    constraints: e.constraints
                })),
            })
        }
        req.body = instance
        next()
    }
}