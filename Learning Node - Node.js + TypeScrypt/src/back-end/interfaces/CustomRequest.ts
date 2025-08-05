import {Request} from 'express'
import { UserType } from '../models/User'

export interface CustomUser extends Request {
    user: UserType
}