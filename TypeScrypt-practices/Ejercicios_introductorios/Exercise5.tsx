/*Aqui creamos un type de nombre Usuarios que contendra la estructura de nuestor array.
Creamos un type prop que contendra propname : type (Asi le asignamos los props del type antes creado)
Despues de crear el array tenemos que usar const name = type[] =[{}]
*/

type Usuarios = {
    Nombre: string
    Edad : number
    rol: 'user' | 'admin'
}

type Props ={
    usuarios: Usuarios[]
}
const usuarios : Usuarios[] =[
    {Nombre: 'Kevin', Edad: 21, rol:'user'},
    {Nombre: 'Alonso', Edad: 19, rol:'admin'},
    {Nombre: 'Martin', Edad: 23, rol:'user'}
]



const Exercise5 = ({usuarios}: Props) =>{
    return(
        <>
        <div>
            <h1>Este Componente lee un array!</h1>
        </div>
        <div>
            <ul>
            {usuarios.map((usuario, index) =>(
                <li key={index}>El nombre del usuario es {usuario.Nombre}, su edad es {usuario.Edad}
                y tiene el rol de {usuario.rol}</li>
            ) 
            )}

            </ul>
        </div>
        </>
    )
}

/*En el App

import Exercise5 from './Exercise5'

function App(){

return(
    <>
    <Exercise5 usuarios={usuarios}/>
    </>
)
}
export default App

*/
