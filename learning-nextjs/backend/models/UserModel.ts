import { Schema, model, Document} from 'mongoose'

export interface IUser extends Document {
    id: string,
    username: string,
    email: string,
    password: string,
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'El nombre de usuario es obligatorio'],
            trim: true,
            minlenght: 3,
            maxlenght: 40
        },
    
    
        email: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Email invalido']
        },
        password:{
            type:String,
            require: [true, 'La contraseña es obligatoria'],
            minlength: 6
        }
    },
    {
        timestamps: true
    }
)

export const UserModel = model<IUser>('User', userSchema)
    
