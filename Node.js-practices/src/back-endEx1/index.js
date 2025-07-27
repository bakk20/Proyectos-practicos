import express from 'express'
import saludoRoute from './routes/saludoRoute.js'
import catalogRoute from './routes/catalogRoute.js'
import formRoute from './routes/formRoute.js'
import {logger} from './middlewares/logger.js'
import {errorHandler} from './middlewares/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

//Usado en todo el sistema
app.use(logger)

//Ruta principal
app.get('/', (req, res) =>{
    res.send('Bienvenido al sistema!')
})

//Rutas activas
app.use('/saludo', saludoRoute)

app.use('/catalog', catalogRoute)

app.use('/form', formRoute)


//Handler de errores global
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log(`Servidor EX1 corriendo en ${PORT}`)
})


/*import express from 'express'

const app = express()
const PORT = 5000

//Con esto permites que express lea jsons
app.use(express.json())

//Ruta de prueba, saludo al iniciar la pagina
app.get('/', (req, res) =>{
    res.send('Bienvenido al sistema!')
})

//Post de prueba, recibe nombre y lo usa para dar un saludo
app.post('/saludo',(req, res) =>{
const{nombre} = req.body

//Callback de error
if(!nombre){
    return res.status(400).json({error:'No se encontro un nombre o es valido!'})
}
//Usuario encontrado en body
    res.json({mensaje:`Bienvenido ${nombre}!`})
})

//Depuracion: Servidor iniciado?
app.listen(PORT, () =>{
    console.log('Servidor iniciado correctamente')
})*/