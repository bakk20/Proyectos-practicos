import { Router } from 'express';
import {validateUser, validateID} from '../middlewares/dataAuthMiddleware.js'
import { verifyToken, checkRole, isOwnerOrAdmin } from '../middlewares/verifyTokenMiddleware.js';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/users.controller.js';

const router = Router();


// Rutas activas, aqui se redirige al controlador
router.get('/', verifyToken, checkRole('admin'), getAllUsers);
router.get('/:id', verifyToken, validateID,  getUserById);
router.post('/', validateUser, createUser);
router.put('/:id', verifyToken, isOwnerOrAdmin, validateUser, updateUser); 
router.delete('/:id', verifyToken, checkRole('admin'), validateID, deleteUser);

export default router;

/*
Para acceder a alguna ruta deberas usar .../api/users/(ruta)
ex: http://localhost:5000/api/users - que te permitira ingresar si el servidor fue iniciado correctamente!
si quieres usar los :id tienes que hacer /api/users/(1 o 2 en este caso)
De esa forma consigues un usuario, cambias los datos en uno o borras al usuario (get,put,delete)
*/
