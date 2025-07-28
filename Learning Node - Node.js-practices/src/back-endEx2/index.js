import express from 'express'
import userRoutes from './routes/users.routes.js'

import connectDB from './controllers/database.js'

const app = express()
connectDB()
const PORT = process.env.PORT || 5000

//Este js usa jsons!
app.use(express.json())

//Las rutas ahora iniciaran con api (para seguridad)
app.use('/api/users', userRoutes)

//Middleware de control de errores
app.use((res,req,next,err) =>{
    console.error(err.stack)
    res.status(500).json({error:'Error del servidor'})
})

//Servidor inicia correctamente
app.listen(PORT, () =>{
    console.log(`Servidor EX2 iniciado correctamente en el puerto ${PORT}`)
})