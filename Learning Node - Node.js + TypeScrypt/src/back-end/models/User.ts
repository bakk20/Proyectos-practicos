import {Schema, model , Document, InferSchemaType} from 'mongoose'

interface IUser extends Document {
    'id': string,
    'name': string,
    'email': string,
    'password': string,
    'role':'user' | 'admin' 
}

const userSchema = new Schema<IUser>({
    id: {type: 'string' },
    name: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type:'string', required: true},
    role: {type: 'string', required: true}

})

export type UserType = InferSchemaType<typeof userSchema>
export const User = model('User', userSchema)