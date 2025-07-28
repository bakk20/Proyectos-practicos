import { Router } from "express"
import { saludos } from "../db/testDatabase.js"
    export const obtenerSaludos = (req, res) =>{
        res.json(saludos)
    }


   /* const {nombre} = req.body

    const router = Router()
    //Respuesta de tipo error (400) y json da el mensaje que se mostrara en pantalla
    if(!nombre){
        return res.status(400).json({error:'No se encontro el nombre en el formulario'})

    }

    res.json({mensaje:`Bienvenid@ ${nombre}!`})*/
