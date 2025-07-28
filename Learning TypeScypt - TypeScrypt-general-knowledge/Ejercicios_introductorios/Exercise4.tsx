type prop = {
    Nombre: string
    Edad: number
    rol: 'user' | 'admin'
}


const Exercise4 = ({Nombre, Edad, rol} :prop) =>{

    return(
        <>
        <div>
            <h1>
                Este componente usa Logica para discernir entre usuario y Admin!
                </h1>
            </div>
        <div>
            {rol === 'user' ? `Bienvenido ${Nombre}, tienes ${Edad} años y tu rol es de ${rol}`
              : `Bienvenido ${Nombre}, tienes ${Edad} años y tu rol es de ${rol}` }
            <>
            </>
        </div>
        </>
    )
}
export default Exercise4

/* Ahora en el App.jsx 

import Exercise4 from '/.Exercise4.tsx'

function App() {
    return(
        <>
        <Exercise4 Nombre = 'Kevin' Edad={21} rol='user'/>
        <Exercise4 Nombre = 'Kevin' Edad={21} rol='admin'/>
        </>
    )
}
export default App
*/ 
