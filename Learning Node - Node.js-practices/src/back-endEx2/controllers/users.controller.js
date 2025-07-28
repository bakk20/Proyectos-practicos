import User from "../models/user.js";


export const getAllUsers = async (req,res) =>{
    try{
        const user = await User.find()
        res.json(user)
    }catch(error){
        res.status(404).json({error:'No se encontraron usuarios'})
    }
}

export const getUserById = async (req,res) =>{
    try{
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({error:'Usuario no encontrado!'})
        }

        res.json(user)
    }catch(error){
        res.status(500).json({error:'Error al buscar al usuario'}) 
    }
}

export const createUser = async (req,res) =>{
    try{
        const {name,email,age} = req.body

        if(!name || !email){
           return res.status(400).json({error:'Falta llenar los campos requeridos'})
        }

        //Buscar usuario - findOne
        const existing = await User.findOne({email})
        if(existing){
           return res.status(400).json({error:'Correo ya en uso'})
        }

        //Crea al usuario - create
        const newUser = await User.create({name,email,age})
        res.status(201).json(newUser)

    }
    catch(error)
    {
        res.status(500).json({error:'No se pudo crear usuario'})
    }
}

export const updateUser = async (req,res) =>{
    try{
        const {name, email, age} = req.body
        const updateUser = await User.findByIdAndUpdate(req.params.id,
            {name, email, age},
            {new: true, runValidator: true}
        )
        if(!updateUser){
            return res.status(404).json({error:'Usuario no encontrado!'})
        }
        res.json(updateUser)
    }catch(error){
        res.status(500).json({error:'Error al actualizar el usuario'})
    }
}

export const deleteUser = async (req,res) =>{
    try{
        const deleted = await User.findByIdAndDelete(req.params.id)

        if(!deleted){
            return res.status(404).json({error:'El usuario no existe o ya fue elminado'})
        }
        res.json({message:'Usuario elminado correctamente!'})
    }catch(error){
        res.status(500).json({error:'No se pudo eliminar al usuario'})
    }
}




/////////////////////////////////////////////////////


//Lo siguiente es sin usar MongoDb!
{/*
import { users } from "../models/users.data";

export const getAllUsers= (req,res,next) =>{
    res.json(users)
}

export const getUserById = (req,res,next) =>{
    const id = parseInt(req.params.id)
    const user= users.find(u => u.id === id)

    if(!user){
        return res.status(404).json({error:'Usuario no encontrado'})
    }
    res.json(user)
}

export const createNewUser = (req,res,next) =>{
    const {Name, Age, Email} = req.body

    if(!Name || !Age || !Email){
        return res.status(400).json({error:'Faltan campos por llenar'}) 
    }
    
    const newUser={
        id: users.lenght+1,
        Name,
        Age,
        Email
    }

    users.push(newUser)
    res.status(201).json(newUser)
}

//Actualizamos datos del usuario

export const updateUser=(req,res,next) =>{
    const id = parseInt(req.params.id)
    const{Name,Age,Email} = req.body
    const user = users.find(u => u.id ===id)

    if(!user){
        return res.status(404).json({error:'Usuario no encontrado'})
    }

    if (Name) user.Name = Name
    if (Age) user.Age= Number(Age)
    if (Email) user.Email = Email
    
    res.json(user)
}

//Borramos al usuario

//
export const deleteUser = (req,res,next) =>{
    const id = parseInt(req.params.id)
    const index = users.find(u => u.id === id)

    if(index === -1){
        return res.status(404).json({error:'Usuario no encontrado'})
    }
    users.splice(index,1)
    res.json({message:'Usuario eliminado exitosamente!'})
}
*/}