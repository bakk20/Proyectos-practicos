import { createContext, useContext, useState, useEffect } from "react";
import  {jwtDecode}  from "jwt-decode";
const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [user, setUser] = useState(token ? jwtDecode(token) : null)

    const login = (token) => {
        const decoded = jwtDecode(token)
        localStorage.setItem("token", token)
        setToken(token)
        setUser(decoded)

    }

    const logout = () =>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }
    
    return(
        <AuthContext.Provider value ={{token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)