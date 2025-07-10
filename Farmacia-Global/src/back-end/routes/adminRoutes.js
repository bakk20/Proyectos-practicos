import express from 'express';
import { loginAdmin, crearAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);

// Ruta temporal para crear un admin
router.post('/register', crearAdmin);

export default router;