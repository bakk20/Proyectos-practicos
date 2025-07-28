import { Router } from "express";
import { formDataController } from "../controllers/formDataController.js";

const router = Router()

router.post('/test-form', formDataController)

export default router