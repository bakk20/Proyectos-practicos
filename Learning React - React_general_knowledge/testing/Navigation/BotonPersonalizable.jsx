import React from 'react'

export const BotonPersonalizable = ({texto, color, onClick}) => {

    const handleChanges = () =>{
        setColor(color)
        setTexto(texto)
    }

  return (
    <>
    <div>
        <h1>Este boton cambia de configuracion, no por estilo establecido por pagina, sino que
        la pagina establece el estilo</h1>
        <p>El boton te mostrara que estilo tiene la pagina al hacerle click</p>
    </div>

    <button onClick={handleChanges} style={{color:color}}> {texto}</button>
    </>
  )
}
