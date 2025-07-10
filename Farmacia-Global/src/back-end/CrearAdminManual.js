// src/back-end/crearAdminManual.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';

dotenv.config();

const crearAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const username = 'admin@gmail.com';
    const password = '123456';

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log('Ya existe un admin con ese correo.');
      process.exit();
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoAdmin = new Admin({ username, passwordHash });
    await nuevoAdmin.save();

    console.log('✅ Admin creado correctamente.');
    process.exit();
  } catch (err) {
    console.error('Error al crear admin:', err);
    process.exit(1);
  }
};

crearAdmin();