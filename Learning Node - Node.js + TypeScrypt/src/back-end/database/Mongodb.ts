import { Request, Response} from "express";
import mongoose from "mongoose";

export const MongoDBConnection = async() : Promise<void> =>{
    try{
    const uri = process.env.MONGODB_URI
    
    if(!uri){
        throw new Error('No se encontro la variable MONGODB_URI')
    }
    
    await mongoose.connect(uri)
    console.log('Conectado a MONGODB')
    }catch(error){
        console.error('No se pudo conectar a MongoDB', error)
        process.exit(1)
    }
}