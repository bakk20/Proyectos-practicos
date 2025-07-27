import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user'

const JWT_SECRET = 'tu_clave_secreta'

export const userLogin = async (req, res) =>{
    try{
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!email){
            return res.status(400).json({error:'El correo es invalido o no existe'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({error:'Contraseña invalida'})
        }

        const token = jwt.sign({userID: user._id, role: user.role}, JWT_SECRET,{
            expiresIn: '1h'
        })

        res.json(token)
    }catch(error){
        res.status(500).json({error:'No se pudo ingresar al servidor'})
    }
}
