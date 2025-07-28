type Usuario ={
    id: number
    Nombre: string
    Edad: number
    Rol: 'user' | 'admin'
}

type Props = {
    Usuarios: Usuario[]
}

const usuarios: Usuario[] = [
    {Nombre: 'Kevin', Edad: 21, Rol:'admin', id:Date.now()},
    {Nombre: 'Alonso', Edad: 17, Rol:'user', id:Date.now()},
    {Nombre: 'Kevin', Edad: 24, Rol:'user', id:Date.now()},
]

import {useState} from 'react'

const Exercise10 = ({Usuarios}: Props) => {
    const[users, setUsers] = useState<Usuario[]>(Usuarios)
    const[editing, setEditing] = useState<boolean>(false)
    const[confirm, setConfirm] = useState<boolean>(false)

    const[id, setId] = useState<number | null>(null)
    const[name, setName] = useState<string>('')
    const[age, setAge] = useState<number>(0)
    const[rol, setRol] = useState<'user' | 'admin'>('user')


    const handleUserId = ( id: number) =>{
        const UserID = users.find(u => u.id === id)
        if(UserID){
        setEditing(true)
        setId(UserID.id)
        setName(UserID.Nombre)
        setAge(UserID.Edad)
        setRol(UserID.Rol)
        }
    }

    const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value)
    }
    const handleAgeChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setAge(Number(e.target.value))
    }
    const handleRolChange = (e : React.ChangeEvent<HTMLSelectElement>) =>{
        setRol(e.target.value as 'user' | 'admin')
    }

    const handleUserChanges= (e: React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault()
            const changeUserData = users.map((u) =>
                u.id === id
                ? {...u, 
                    Nombre:name,
                    Edad: age,
                    Rol: rol }
                : u
                )
                
                setUsers(changeUserData)
                setName('')
                setAge(0)
                setRol('user')
    }

    const handleExitEditing = (e: React.MouseEvent<HTMLButtonElement>) =>{
        setEditing(false)
        setId(null)
        setName('')
        setAge(0)
        setRol('user')
    }

    const handleUserDelete = (e: React.MouseEvent<HTMLButtonElement>) =>{
        setConfirm(true)
    }

    const handleConfirmDelete = (e :React.MouseEvent<HTMLButtonElement>) =>{
        const deleteUser= users.filter((u) =>
            u.id !== id
        )
        setUsers(deleteUser)
        setId(null)
        setConfirm(false)
        setEditing(false)
    }
    return(
        <>
        <div>
            <h1>Este programa usa Filter para borrar usuarios de su lista!</h1>
            <p>A continuación, la lista de usuarios actual:</p>

            <ul> 
                {users.map((u) =>(
                <li key={u.id}>
                    {`${u.Nombre} (${u.Edad}) - ${u.Rol}`}
                    <button onClick={() => handleUserId(u.id)}>Editar!</button>
                </li>
            ))}

            </ul>
            {editing && (
            <>
            <div>
                <button onClick={handleExitEditing}>Salir de edición</button>
                <form onSubmit={handleUserChanges}>
                <input placeholder={name}
                 value={name}
                 onChange={handleNameChange}/>
                <input placeholder={age.toString()}
                 value={age} onChange={handleAgeChange}/>
                <select value ={rol}onChange={handleRolChange}>
                    <option value='user'>Usuario</option>
                    <option value='admin'>Adminstrador</option>
                </select>
                <div>
                    <button type='submit'>Aceptar cambios</button>
                    <button onClick={handleUserDelete}>Borrar usuario</button>
                </div>
                </form>
            </div>
            </>
            )}

            {confirm &&(
                <>
                <div>
                <p>¿Seguro que quiere borrar al usuario {name}?</p>
                <button onClick={handleConfirmDelete}>Confirmar</button>
                </div>
                </>
            )}

        </div>
        </>
    )
}