// src/back-end/controllers/user.controller.js
import User from '../models/user.model.js';

export const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Excluir contraseñas
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
  },

  // Puedes añadir más cosas aquí luego: getUserById, updateUser, deleteUser, etc.
};