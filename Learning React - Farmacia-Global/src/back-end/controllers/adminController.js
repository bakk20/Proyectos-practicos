import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

export const crearAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Ese usuario ya existe' });

    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoAdmin = new Admin({ username, passwordHash });
    await nuevoAdmin.save();

    res.status(201).json({ message: 'Administrador creado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear administrador', error });
  }
};