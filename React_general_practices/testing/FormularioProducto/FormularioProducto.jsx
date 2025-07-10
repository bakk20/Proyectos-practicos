import React from 'react'
import {useState} from 'react'
export const FormularioProducto = () => {
    const[nombre, setNombre] = useState('')
    const[precio, setPrecio] = useState('')
    const[exito, setExito] = useState('')
    const[error, setError] = useState('')

   //Aqui la confirmacion
   const handleProducto = (e) =>{
    e.preventDefault();
    if(nombre.trim() ==='' ){
        setError('El nombre esta vacio')
        return;
    }
    if(isNaN(precio) || Number(precio) <=0 ){
        setError('El precio es incorrecto')
        return;
    }
    setError('')
    setExito('El producto ah sido guardado')
   }

  return (
    <>
    <div>
        <h1>Este formulario te deja Asignar un nombre y un precio al producto</h1>
    </div>
    <div>
        <form  onSubmit={handleProducto}>
            <div>
                <h3>Ingresa el Nombre del producto</h3>
            <input value={nombre} placeholder='Nombre aqui' onChange={e => {setNombre(e.target.value); setExito('') }} ></input>
            </div>
            <div>
                <h3>Ingresa el precio del producto</h3>
            <input value={precio} type='number' placeholder='Precio Aqui' onChange= {e => {setPrecio(e.target.value); setExito('')}}></input>
            </div>
            <button type='submit'>Aceptar</button>
        </form>
        <div>
            {error && <p style={{ color:'red'}}>{error}</p>}
            {exito && <p style={{ color:'green'}}>{exito}</p>}
        </div>
    </div>
    </>
  )
}
