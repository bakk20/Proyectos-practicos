import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
    <div>
    <>
      <Navbar /> 
      <main>
        <Outlet />
      </main>
    </>
    </div>
    </>
  )
}
