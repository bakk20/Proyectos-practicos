import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { MongoDBConnection } from './database/Mongodb.ts'
import GeneralRoutes from './routes/GeneralRoutes.ts'

dotenv.config()
const app = express()
const PORT = process.env.PORT || '5000'

MongoDBConnection()

app.use(express.json())
app.use(cors({
    origin: '*',
}))
app.use('/auth', GeneralRoutes)

app.listen(PORT, () =>{
    console.log(`Servidor activo en el puerto ${PORT}`)
})

