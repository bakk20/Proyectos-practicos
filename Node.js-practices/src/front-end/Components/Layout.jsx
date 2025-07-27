import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
    <div>
    <>
      <Navbar /> {/* No pongas nada dentro */}
      <main>
        <Outlet /> {/* Aquí se renderiza el contenido de la ruta */}
      </main>
    </>
    </div>
    </>
  )
}
