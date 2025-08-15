import {Request} from 'express'
import { UserType } from '../models/User.ts'

export interface CustomUser extends Request {
    user: UserType
}