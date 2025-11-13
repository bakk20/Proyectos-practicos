import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import UserRoutes from '../backend/routes/UserRoutes'
import {connectDB} from './config/dbConfig'

const app = express()
dotenv.config()

const Port= (process.env.PORT || 5000) 

app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000", // <-- tu frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // incluye OPTIONS para preflight
  allowedHeaders: ["Content-Type", "Authorization"], // importante si usas tokens
  credentials: true
}));
connectDB()


app.use('/auth', UserRoutes)


app.listen(Port, () => console.log(`MongoDb corriendo en el puerto ${Port}`) )