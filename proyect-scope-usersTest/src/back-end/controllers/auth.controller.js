// src/back-end/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const authController = {
  registerUser: async (req, res) => {
    const { name, email, password, age } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El correo ya está en uso' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        age,
      });

      await newUser.save();

      const { password: _, ...userWithoutPassword } = newUser._doc;

      res.status(201).json({ message: 'Usuario registrado correctamente', user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
      console.error('Register error:', error);}
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });

      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });


      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

    const { password: _, ...userWithoutPassword } = user.toObject();

      res.status(200).json({ message: 'Login exitoso',token,  user:userWithoutPassword });
    } catch (error) {
      console.log("Login error", error);
      res.status(500).json({ message: 'Error al iniciar sesión', error });
      onsole.error('Login error:', error);

    }
  }
};