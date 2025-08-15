import Raact, {createContext, useContext, useState, ReactNode} from 'react'
import { jwtDecode } from 'jwt-decode'

//Info que contiene el token
type UserPayload ={
    id:string,
    role:string,
    name:string,
    email:string
}

//info del Context
type AuthContextType ={
    token: string | null,
    user: UserPayload | null,
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

//Permite que el context use los Nodos (children)
type AuthProviderProps ={
    children: ReactNode
}

export const AuthProvider = ({children} : AuthProviderProps) =>{
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

    const [user, setUser] = useState<UserPayload | null>(() =>{
        const savedToken = localStorage.getItem('token')
        if(savedToken){
            const decoded = jwtDecode(savedToken)
            if(decoded && typeof decoded === 'object'){
                return decoded as UserPayload
            }
        }
        return null
    })


    const login = (newToken: string) =>{
        const decoded = jwtDecode(newToken)
        if(decoded && typeof decoded === 'object'){
            localStorage.setItem('token', newToken)
            setToken(newToken)
            setUser(decoded as UserPayload)
        }
    }


    const logout = () =>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }


    return(
        <AuthContext.Provider value={{token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType =>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth necesita estar dentro de AuthProvider para poder ser usado') 
    }
    return context
}