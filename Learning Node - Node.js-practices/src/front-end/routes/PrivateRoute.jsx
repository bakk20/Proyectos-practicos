import {Navigate} from 'react-router-dom'
import {useAuth}  from '../context/AuthProvider'

export const PrivateRoute = ({children}) =>{
    const {token} = useAuth()
    return token ? children : <Navigate to='login'/>
}

export const AdminRoute = ({children}) =>{
    const {user} = useAuth()
    return user?.role === "admin" ? children : <Navigate to='/'/>
}

