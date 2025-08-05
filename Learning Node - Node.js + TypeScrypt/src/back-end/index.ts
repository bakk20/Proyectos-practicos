import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || '5000'

app.use(express.json())

app.get('/', (_req, res) =>{
    res.send('Ruta de prueba en el servidor alcanzada!')
}) 

app.listen(PORT, () =>{
    console.log(`Servidor activo en el puerto ${PORT}`)
})

