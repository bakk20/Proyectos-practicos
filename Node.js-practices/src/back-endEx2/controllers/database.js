import mongoose from "mongoose";

const connectDB = async () =>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/DBEX2')
    console.log(`MongoDB conectado! : ${conn.connection.host}`)
    }catch(error){
        console.error(`Error al conectar a MongoDB, ${error.message}`)
        process.exit(1)
    }
}

export default connectDB