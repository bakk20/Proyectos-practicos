import { Router } from "express";
import { registerUser } from "../controllers/user.register.controller.js";
import { getAllUsers, getUserById, updateUser, deleteUser, createUser} from '../controllers/admin.controller.js'
import { userLogin } from "../controllers/user.login.controller.js";
import { validateUser } from "../middlewares/dataAuthMiddleware.js";
import { verifyToken, isOwnerOrAdmin , checkRole} from "../middlewares/verifyTokenMiddleware.js"; 


const router = Router()

    router.post('/register', validateUser(),registerUser)
    router.post('/login', validateUser(), userLogin)

    router.get('/users', verifyToken, checkRole('admin'), getAllUsers)
    router.get('/user/:id', verifyToken, isOwnerOrAdmin, getUserById)
    router.post('/user/create', verifyToken, checkRole('admin'), createUser)
    router.put('/update/:id', verifyToken, isOwnerOrAdmin, updateUser)
    router.delete('/delete/:id', verifyToken, checkRole('admin'), deleteUser) 

export default router