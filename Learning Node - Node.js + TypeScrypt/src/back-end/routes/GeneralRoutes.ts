import { Router } from "express";
import { getAllUsers, getUserDataById, updateUserData, createUser, deleteUser } from "../controllers/UserControllers";
import { UserLogin, UserRegister } from "../controllers/UserManagementControlle";
import { validateUser } from "../middlewares/TokenMiddleware";

const router = Router()

router.post('/login', UserLogin)
router.post('/register', UserRegister)

router.get('/users', validateUser, getAllUsers)
router.get('/user/:id', validateUser, getUserDataById)
router.post('/update/:id', validateUser, updateUserData)
router.post('/create', validateUser, createUser)
router.delete('/delete', validateUser, deleteUser)

export default router