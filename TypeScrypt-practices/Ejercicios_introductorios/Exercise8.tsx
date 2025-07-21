/*Exceptuando una pequeña guia de de como es la logica en TS, solo use un
 pequeño ejemplo de como hacer un "push"(aunque no lo es)
al array antes creado.
Todo lo demas lo hice yo usando conocimientos de react, me sorprende.*/


type Usuario = {
    Nombre: string
    Edad: number
    rol: 'user' | 'admin'
}

type Prop= {
    Usuarios: Usuario[]
}

const Usuarios: Usuario[] =[
    {Nombre: 'Alexander', Edad: 21, rol: 'user'},
    {Nombre: 'Mark', Edad: 24, rol: 'user'},

]

import {ChangeEvent, useState} from 'react'

const Exercise8 =({Usuarios} : Prop ) =>{
    const[users, setUsers] = useState<Usuario[]>([])
    const[addUser, setAddUser] = useState<boolean>(false)
    const[name, setName] = useState<string>('')
    const[age, setAge] = useState<number>(0)
    const[urol, setUrol] = useState<'user' | 'admin'>('user')

//Cada handler para registrar los cambios de estado
    const handleAddUser = () =>{
        setAddUser(true)
    }
    const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value)
    }
    const handleSetAge = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setAge(Number(e.target.value))
    }

    const handleRolchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUrol(e.target.value as 'user' | 'admin')
    }

    const handleAcceptUser = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const newUserArray: Usuario ={
            Nombre : (name), 
            Edad: (age),
            rol : (urol),
        }

        setUsers([...users, newUserArray ])

        //Reiniciamos el estado de cada prop y mostramos otra vez la lista de usuarios
        setName('');
        setAge(0);
        setUrol('user');
        setAddUser(false)
    }

    return(
        <>
        <div>
            <h1>Este componente te deja ingresar un nuevo usuario con un form!</h1>
        </div>
        {/*Boolean Toggle para mostrar y ocultar nuestro formulario*/ }
        {!addUser ?( 
        <>
        <div>
            <form onSubmit={handleAcceptUser}>
            <p>Ingresa un nuevo usuario:</p>
            <input value={name}
             placeholder='Ingresa el nombre de usuario'
             onChange={handleSetName}
             />
            <input type="number" value={age}
             placeholder='Ingresa la edad del usuario'
             onChange={handleSetAge}/>

            <p>¿Que rol tiene el usuario?</p>

            <select value={urol} onChange={handleRolchange}>Elige el rol
            <option value='admin'>Administrador</option>
            <option value='user'>Usuario</option>
            </select>

            <button type="submit">Aceptar</button>
            </form>
        </div>
        </> 
        ) : (
        <>
        <div>
            <ul>
            {users.map((u, index) =>(
                <li key={index}>
                    {u.Nombre} ({u.Edad}) - {u.rol}
                </li>
            ))}
            </ul>
            <button onClick={handleAddUser}>Nuevo usuario</button>

        </div>

        </>
        )}
        </>
    )
}