import { Router } from "express";
import { userLogin, userRegister } from "../controllers/UserController";
import { getUserData, getUsers, createUser, updateUser, deleteUserById } from "../controllers/PanelController";


const router = Router()
    router.post('/login', userLogin)
    router.post('/register', userRegister)
    router.get('/users', getUsers)
    router.get('/user/id', getUserData)
    router.post('/user/create', createUser)
    router.patch('/user/id', updateUser)
    router.delete('/user/id', deleteUserById)

export default router
