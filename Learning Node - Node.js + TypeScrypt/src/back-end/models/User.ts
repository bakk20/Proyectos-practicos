import {Schema, model , Document, InferSchemaType} from 'mongoose'

interface IUser extends Document {
    'id': string,
    'name': string,
    'email': string,
    'password': string,
    'role':'user' | 'admin' 
}

const userSchema = new Schema<IUser>({
    name: {type: 'String', required: true},
    email: {type: 'String', required: true},
    password: {type:'String', required: true},
    role: {type: 'String', required: true}

})

userSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: (_doc: IUser, ret: any) => {
        ret.id = ret._id;  
        delete ret._id;     
    }
})

export type UserType = InferSchemaType<typeof userSchema>
export const User = model<UserType>('User', userSchema)