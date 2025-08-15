import  User  from "../models/user.js"
import bcrypt from "bcryptjs"

export const getAllUsers = async (req, res) =>{
    try{
    const users = await User.find().select("-password")
    res.json(users)
    }catch(error){
        res.status(500).json({message:'Error en el sistema', error: error.message})
    }
}

export const getUserById = async (req, res) =>{
    const {id} = req.params
    console.log('Usando GetUserById!', id)

    try{
        const user = await User.findById(id).select('-password')

        if(!user){
            return res.status(404).json({message:'El usuario no existe'})
        }
        res.json(user)
    }catch(error){
        res.status(500).json({message:'Error en el sistema', error: error.message})
    }
}

export const createUser = async (req,res) =>{
    try{
        const {name, email, password, age, role} = req.body

        const find = await User.findOne({email})
        if(find){
            return res.status(400).json({message:'El correo ya esta en uso y el usuario ya existe!'})
        }
        if(password.length < 6){
            return res.status(400).json({message:'La contraseña no tiene el minimo de caracteres (min. 6)'})
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const user = new User ({
            name,
            age,
            email,
            password: hashpassword,
            role
        })

        await user.save()
        res.status(201).json({message:'Usuario creado!:',
            'name': name,
            'age': age,
            'email': email,
            'role': role
        })
    }catch(error){
        res.status(500).json({message:'Error en el sistema', error:error.message})
    }
}

export const updateUser = async (req,res) =>{
    try{
    const {name, email, password, age, role} = req.body


    const findUser = await User.findById(req.params.id)

    if(!findUser){
        return res.status(404).json({message:'No se encontro el usuario o los datos esta incompletos'})
    }

    if(name) findUser.name = name
    if(email) findUser.email = email
    if(age) findUser.age = age
    if(role) findUser.role = role

    if(password){
        const hashedpassword = await bcrypt.hash(password, 10)
        findUser.password = password
    }

 
    const updateUser = await findUser.save()

    res.status(200).json({
        message:'Usuario actualizado',
        'name': name,
        'email': email,
        'age': age,
        'role': role})

    }catch(error){
        res.status(500).json({message:'Error en el sistema', error:error.message})
    }
}

export const deleteUser = async (req, res) =>{
    try{
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user){
        return res.status(404).json({message:'El usuario no fue encontrado', error: error.message})
    }
    res.json(user)
    }catch(error){
        res.status(500).json({message:'Error en el sistema', error: error.message})
    }
}

