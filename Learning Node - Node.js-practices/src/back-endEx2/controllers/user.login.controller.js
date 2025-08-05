import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'

//Controla el Inicio de Sesión
export const userLogin = async (req, res) =>{
    try{
        console.log('Llego a login!')
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:'El correo es invalido o no existe'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({error:'Contraseña invalida'})
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.json({message:'Inicio de sesión exitoso', token})
    }catch(error){
        res.status(500).json({error:'No se pudo ingresar al servidor'})
    }
}
