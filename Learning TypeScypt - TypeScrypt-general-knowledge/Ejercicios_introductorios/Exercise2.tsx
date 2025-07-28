type props ={
    Nombre: string[]
    Edad: number[]
}

const Exercise2 = ({Nombre, Edad}: props) =>{
    return(
        <>
        <div>
            <h1>Este componente usa Arrays!</h1>
        </div>
        <div>
            <ul>
                {Nombre.map((nombre, index) =>(
                    <li key={index}>
                        Tu nombre es {Nombre} y tu edad es {Edad[index]}
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

/*Ahora en el App.tsx

import Exercise2 from './Exercise2.tsx'

function App(){
    return(
    <Exercise2
    Nombres={["Kevin", "Mario", "Alonso"]}
    Edades={[21, 17, 25]}
    />
    )
}
*/