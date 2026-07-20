import express from 'express';
import { crearOrden, obtenerOrden } from '../controllers/orderController.js';

const router = express.Router();

// Crear un pedido (checkout simulado)
router.post('/', crearOrden);

// Obtener un pedido por ID (pantalla de confirmación)
router.get('/:id', obtenerOrden);

export default router;
