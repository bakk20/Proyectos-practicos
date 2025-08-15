import { Router } from "express";
import { getAllUsers, getUserDataById, updateUserData, createUser, deleteUser } from "../controllers/UserControllers.ts";
import { UserLogin, UserRegister } from "../controllers/UserManagementController.ts";
import { validateUser } from "../middlewares/TokenMiddleware.ts";
import { verifyRole } from "../middlewares/IsAdminMiddleware.ts";
import { ValidateFormData } from "../middlewares/authForm.middleware.ts";
import { LoginDto } from "../dtos/login.dtos.ts";
import { registerDto } from "../dtos/register.dtos.ts";

const router = Router()

router.post('/login', ValidateFormData(LoginDto),  UserLogin)
router.post('/register', ValidateFormData(registerDto), UserRegister)

router.get('/users', validateUser, verifyRole, getAllUsers)
router.get('/user/:id', validateUser, verifyRole, getUserDataById)
router.patch('/user/update/:id', validateUser, verifyRole, updateUserData)
router.post('/user/create', validateUser, verifyRole, createUser)
router.delete('/user/delete/:id', validateUser, verifyRole, deleteUser)

export default router