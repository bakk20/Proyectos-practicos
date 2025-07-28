import React from 'react'
import { useNavigate } from react-router-dom
import{ BotonPersonalizable } from './BotonPersonalizable'

export const Home = () => {

    const navigate = useNavigate()

    const handleNavegacion = () =>{
        navigate('/catalog')
    }


  return (
    <>
    <div>Este es el inicio</div>
    <button onClick={handleNavegacion}>Da Click Aqui para ir al Catalogo</button>
    <BotonPersonalizable 
        texto='Este boton es Verde, soy como el boton de arriba, pero verde.'
        color='White'
        onClick={handleNavegacion}/>
    </>
  )
}
