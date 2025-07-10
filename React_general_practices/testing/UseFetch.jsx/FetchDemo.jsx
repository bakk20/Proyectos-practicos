import React from 'react'
import {useState} from 'react'

export const FetchDemo = () => {
const [usuario, setUsuario ] = useState({})
const [cargando, setCargando] = useState(true)
const[error, setError] =useState(null)
    
useEffect(() => {
  console.log('Usando Fetch...')
  fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(res => res.json())
  .then(data =>{
    setUsuario(data);
    setCargando(false)
  })
 .catch(() =>{
  setError('Hubo un error al usar el fetch!')
  setCargando(false);
 })
  
}, [])

if (cargando) return <div><p>Cargando...</p></div>
if (error) return <div><p>{error}</p></div>
  return (
    <>
    <div>
      <h1>Este programa usa un fetch para tomar la lista de direcciones de los usuarios</h1>
      <p>Nombre: {usuario.name}</p>
      <p>Email: {usuario.email}</p>
      <p>Ciudad: {usuario.address?.city}</p>
      </div>
    </>
  )
}
