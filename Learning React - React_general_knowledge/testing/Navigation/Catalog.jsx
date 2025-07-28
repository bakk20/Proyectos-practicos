import React from 'react'
import { useNavigate } from react-router-dom
import{ BotonPersonalizable } from './BotonPersonalizable'


export const Catalog = () => {
    const navigate = useNavigate()

    const handleNavegacion = () =>{
        navigate('/')
    }
  return (
    <>
    <div>Este es el catalogo</div>
    <button onClick={handleNavegacion}>Da Click Aqui para ir al Inicio</button>
        <BotonPersonalizable 
            texto='Este boton es Rojo, soy como el boton de arriba, pero Rojo.'
            color='White'
            onClick={handleNavegacion}/>
    </>
  )
}
