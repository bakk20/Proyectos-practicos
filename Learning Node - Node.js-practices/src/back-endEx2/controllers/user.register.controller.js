import bcrypt from "bcryptjs";
import User from "../models/user.js";

//Controllador del Registro de usuarios
export const registerUser = async (req, res) =>{
    try{
    console.log('Llego a /register!')

    const {name, age, email, password, role} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({error:'El usuario ya ah sido creado!'})
    }

    
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        name,
        age,
        email,
        password: hashedPassword,
        role
    })

    await user.save()
     res.status(201).json({message:'El usuario ah sido creado exitosamente',
        user:{
            name: user.name,
            email: user.email,
            role: user.role
        }
    })
    }catch(error){
        console.log('Error en el Register!')
        res.status(500).json({error:'Error interno del servidor'})
    }
}