import React, {useContext} from 'react'
import {PasenContexto} from './PasenContexto'

export const ChangeContext = () => {
    const{nombre, setNombre} = useContext(PasenContexto)
    
  return (
    <div>
        <h1>Aqui puedes cambiar el nombre de usuario</h1>
        <input placeholder='¿Como te gustaria que te llame?' value={nombre} 
        onChange={e => setNombre(e.target.value)}></input>
    </div>
  )
}
