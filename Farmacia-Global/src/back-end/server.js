import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import adminRoutes from './routes/adminRoutes.js';
import catalogRoutes from './routes/catalogRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/admin', adminRoutes);
app.use('/api/catalog', catalogRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(5000, () => console.log('Servidor corriendo en http://localhost:5000'));
  })
  .catch(err => console.error('Error al conectar a MongoDB:', err));
