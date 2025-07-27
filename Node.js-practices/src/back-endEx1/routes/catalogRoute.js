import { Router } from "express"

const router = Router()

//Debemos configurar el error segun lo que necesitemos.
//En este caso hacemos un Bad Request para probar.
router.get('/test-error', (req, res, next) => {
  const error = new Error('Error de prueba');
  error.statusCode = 400;
  next(error);
});

export default router