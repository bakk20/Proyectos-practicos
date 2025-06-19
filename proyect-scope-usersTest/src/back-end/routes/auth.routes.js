import express from 'express';
import { body, validationResult } from 'express-validator';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js'; // si es que lo tienes

const router = express.Router();

// Validaciones para /register
const validateRegister = [
  body('email', 'Correo inválido').isEmail(),
  body('password', 'Contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // si todo bien, pasa al controlador
  }
];

// Validaciones para /login
const validateLogin = [
  body('email', 'Correo es requerido').notEmpty(),
  body('password', 'Contraseña es requerida').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Rutas con validaciones incluidas
router.post('/register', validateRegister, authController.registerUser);
router.post('/login', validateLogin, authController.loginUser);

router.get('/validate', authMiddleware, (req, res) => {
  res.status(200).json({ valid: true });
});

export default router;