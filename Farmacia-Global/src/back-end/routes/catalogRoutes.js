import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import {
  crearSeccion,
  editarSeccion,
  loginAdmin
} from '../controllers/catalogController.js';
import Seccion from '../models/seccion.js';

const router = express.Router();

// Login de admin
router.post('/login', loginAdmin);

// Crear una nueva sección (bundle o producto)
router.post(
  '/',
  upload.fields([
    { name: 'imagen_0' },
    { name: 'imagen_1' },
    { name: 'imagen_2' },
    { name: 'imagen_3' },
    { name: 'imagen_4' },
    { name: 'imagen_5' }
  ]),
  crearSeccion
);

// Editar una sección existente (con posible reemplazo de imágenes)

router.put(
  '/:id',
  upload.fields([
    { name: 'imagen_0' },
    { name: 'imagen_1' },
    { name: 'imagen_2' },
    { name: 'imagen_3' },
    { name: 'imagen_4' },
    { name: 'imagen_5' }
  ]),
  editarSeccion
);


// Obtener todas las secciones
router.get('/', async (req, res) => {
  try {
    const secciones = await Seccion.find();
    res.json(secciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener secciones' });
  }
});

// Obtener una sección por ID
router.get('/:id', async (req, res) => {
  try {
    const seccion = await Seccion.findById(req.params.id);
    if (!seccion) return res.status(404).json({ error: 'No encontrada' });
    res.json(seccion);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar la sección' });
  }
});

// Eliminar una sección
router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await Seccion.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'No encontrada' });
    res.json({ mensaje: 'Sección eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la sección' });
  }
});

export default router;
