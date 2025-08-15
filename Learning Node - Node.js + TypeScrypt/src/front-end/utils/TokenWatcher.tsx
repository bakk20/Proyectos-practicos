import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { JSX } from "react";


export const CheckToken = () =>{

    const {token} = useAuth()

    if(!token){
        return <Navigate to={'/login'}/>
    }

    return <Outlet/>
}