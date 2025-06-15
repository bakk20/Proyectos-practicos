import {Navigate, Outlet} from "react-router-dom"
export const UserAuth = ({isLoggedIn }) => {
  if(!isLoggedIn){
    return <Navigate to="/"replace/>
  }    
    return <Outlet/>
}

