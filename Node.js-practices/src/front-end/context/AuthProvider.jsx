import { createContext, useContext, useState, useEffect } from "react";
import  {jwtDecode}  from "jwt-decode";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [user, setUser] = useState(token ? jwtDecode(token) : null)

    const login = (token) => {
        localStorage.setItem("token", token)
        setToken(token)
        setUser(jwtDecode(token))
    }

    const logut = () =>{
        localStorage.removeItem(token)
        setToken(null)
        setUser(null)
    }
    
    return(
        <AuthContext.Provider value ={{token, user, login, logut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)