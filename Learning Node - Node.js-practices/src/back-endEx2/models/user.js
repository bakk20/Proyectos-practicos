import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true
    },
    age:{
        type: Number,
        default:0
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default: 'user'
    }


},{
    timestamps:true //Esto automatiza procesos (createAt, updateAt)
})

const User= mongoose.model('User', userSchema)

export default User
