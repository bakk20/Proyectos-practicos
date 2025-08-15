import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar.tsx";
import {ReactNode} from 'react'



export const Layout = () =>{

    return(
        <>
        <div>
            <NavBar/>
            <main className="flex justify-center items-center">
                <Outlet/>
            </main>
        </div>
        </>
    )
}