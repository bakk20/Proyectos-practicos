import express from 'express'
import cors from 'cors'
import authRoutes  from './routes/auth.routes.js'
import connectDB from './controllers/database.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
connectDB()
const PORT = process.env.PORT || 5000

//Cors para Cross-origin
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
//Este js usa jsons!
app.use(express.json())

//Las rutas ahora iniciaran con algun tipo de api (para seguridad)
app.use('/auth', authRoutes)

//Middleware de control de errores
app.use((err,req,res,next) =>{
    console.error(err.stack)
    res.status(500).json({error:'Error del servidor'})
})

//Servidor inicia correctamente
app.listen(PORT, () =>{
    console.log(`Servidor EX2 iniciado correctamente en el puerto ${PORT}`)
})