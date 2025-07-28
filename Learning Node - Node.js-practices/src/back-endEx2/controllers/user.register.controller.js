import bcrypt from "bcryptjs";
import User from "../models/user";

export const registerUser = async (req, res) =>{
    try{
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
    res.status(201).json({message:'El usuario ah sido creado exitosamente'})
    }catch(error){
        res.status(500).json({error:'Error de sistema: No se pudo crear el correo'})
    }
}