type props = {
    Nombre: string;
    Edad: number;
    esAdmin: boolean
}

const Exercise1 = ({Nombre, Edad, esAdmin}: props) => {

    return (
        <>
        <div>
            <h1>Esta funcion te muestra un nombre, edad y Rol preestablecidos</h1>
        </div>
        <div>
            <p>Buenos dias {Nombre}, tienes {Edad} años y {esAdmin ? 'eres un administrador!': 'no eres un administrador.'}</p>
        </div>
        </>
    )
    
}
export default Exercise1


/* 
En el App iria esto:

import Exercise1 from './Exercise1.tsx'

function App() ={
    return(
    <Exercise1 Nombre='Kevin' Edad='21' esAdmin=true/> 
    )
}
*/