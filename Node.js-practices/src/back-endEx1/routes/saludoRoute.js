import {Router} from 'express'
import { obtenerSaludos } from '../controllers/saludoControllers.js'

const router = Router ()

router.post('/', obtenerSaludos)

export default router