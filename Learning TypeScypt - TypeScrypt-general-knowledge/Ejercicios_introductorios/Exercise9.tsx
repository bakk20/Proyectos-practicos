type Usuario = {
    Nombre: string
    Edad: number
    rol: 'admin' | 'user'
    id:number
}

type Props = {
    Usuarios: Usuario[]
}

const usuarios: Usuario[] = [
    {Nombre: 'Kevin', Edad:21, rol:'admin' , id:Date.now()},
    {Nombre: 'Alonso', Edad:19, rol:'user',  id:Date.now()},
    {Nombre: 'Mark', Edad:24, rol:'user', id:Date.now()},
]

import {useState} from 'react'

const Exercise9 = ({Usuarios} : Props ) =>{
    const[user, setUser] = useState<Usuario[]>(Usuarios)
    const[editing, setEditing] =useState<boolean>(false)
    const[id, setId] = useState<number | null>(null)
    const[name, setNewName] = useState<string>('')
    const[age, setNewAge] = useState<number>(0)
    const[Rol, setNewRol] = useState<'user' | 'admin'>('user')



    const handleEdit = (id:number) =>{
        const GetId = user.find(u => u.id === id)
        if(GetId){
            setId(GetId.id)
            setNewName(GetId.Nombre)
            setNewAge(GetId.Edad)
            setNewRol(GetId.rol)
            setEditing(true)
        }
    }
    const handleExitEdit = (e: React.MouseEvent<HTMLButtonElement>) =>{
        setEditing(false)

        setId(null)
        setNewName('')
        setNewAge(0)
        setNewRol('user')        
    }

    const handleNewName =(e: React.ChangeEvent<HTMLInputElement>) =>{
        setNewName(e.target.value)
    }
    const handleNewAge =(e: React.ChangeEvent<HTMLInputElement>) =>{
        setNewAge(Number(e.target.value))
    }
    const handleNewRol =(e: React.ChangeEvent<HTMLSelectElement>) =>{
        setNewRol(e.target.value as'admin' | 'user')
    }
    const handleConfirmUser = (_:React.FormEvent<HTMLFormElement>) =>{

        const updateUser = user.map((u) =>
            u.id === id 
            ? {...u, Nombre: name, Edad: age, rol: Rol}
            : u
        )
        setUser(updateUser)
        setEditing(false)

        setId(null)
        setNewName('')
        setNewAge(0)
        setNewRol('user')


    }
    
    return(
        <>
        <div>
            <h1>Este div te deja editar un usuario!</h1>
        </div>

        <div>
            <p>Esta es la lista de usuarios actuales:
            </p>
        </div>
            <div>
                    <ul>
                    {user.map((u) => (
                        <li key={u.id}>
                            {u.Nombre} ({u.Edad}) - {u.rol}
                            <button onClick={() => handleEdit(u.id)}>Editar!</button>
                        </li>
                    ))}
                </ul>
            </div>
                
            
        {!editing && (
        <>
        <p>Ingresa los datos a cambiar</p>
                    <form onSubmit={handleConfirmUser}>
                        <input value={name} 
                         placeholder={name} 
                         onChange={handleNewName}></input>
                        <input type='number' 
                         value={age} 
                         placeholder={age.toString()} 
                         onChange={handleNewAge}></input>
                        <select value={Rol} 
                         onChange={handleNewRol}>
                            <option value="user">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                        <button type='submit'>Aceptar</button>
                    </form >
            <div>
                <button onClick={handleExitEdit}>Salir de edición</button>
            </div>
        </>)}
        
        </>
    )
}