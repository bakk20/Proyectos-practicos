type Usuario = {
    Nombre: string
    rol: 'user' | 'admin'
}

type Props ={
    Usuarios: Usuario[]
}

const Usuarios: Usuario[] =[
    {Nombre: 'Kevin', rol: 'admin'},
    {Nombre: 'Alonso', rol: 'user'},
    {Nombre: 'Mark', rol: 'user'},
]

import {useState} from 'react'

const Exercise7 =({Usuarios}: Props) => {
    const [users, setUsers] = useState<Usuario[]>([]);

    const handleVerUsers = () =>{
        const seeusers = Usuarios.filter(u => u.rol === "user")
        setUsers(seeusers)
    }
    const handleVerAdmin = () =>{
        const seeadmins = Usuarios.filter(u => u.rol === "admin")
        setUsers(seeadmins)
    }

    const handleVertodo = () =>{
        setUsers(Usuarios)
    }

    return(
        <>
        <div>Este componente usa .filter en el array asignado!</div>
        <div>
            <p>Entonces, ¿que te gustaria ver? : </p>
            <button onClick={handleVerUsers}>Ver usuarios normales</button>
            <button onClick={handleVerAdmin}>Ver al/los administradores</button>
            <button onClick={handleVertodo}>Ve todos los usuarios</button>
        </div>
            <p>Los usuarios a mostrar : </p>
            {users.length > 0 &&(
            <ul>
                {users.map( (u, index) =>(
                    <li key={index}>
                        El usuario: {u.Nombre} tiene el rol de {u.rol}.
                    </li>
                )
                )}
            </ul>
            )}
        </>
    )
}


 /* Estaba usando esto antes de aprender que en algunos casos
 se podria renderizar esa lista de forma vacia, causando un error
 (ademas estoy usando doble .map y eso es un no no)
    <ul>
         {!seeAdmin && (users.map((u, index) =>(
            <li key={index}>
                  Usuario: {u.Nombre} de rol {u.rol}
             </li>
        )))}
          {!seeUsers && (users.map((u,index) =>(
            <li key={index}>
                 Usuario: {u.Nombre} de rol {u.rol}
            </li>
        )))}
    </ul> 
*/
