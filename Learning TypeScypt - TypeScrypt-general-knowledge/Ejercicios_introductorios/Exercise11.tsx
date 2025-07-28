type Usuario = {
    id: number
    Nombre: string
    Edad: number
    Rol: 'user' | 'admin'
}

type Props = {
    Usuarios: Usuario[]
}

const Usuarios: Usuario[] = [
    {Nombre:'Kevin', Edad:21, Rol:'admin', id:Date.now()},
    {Nombre:'Alonso', Edad:21, Rol:'admin', id:Date.now()},
    {Nombre:'Mark', Edad:21, Rol:'admin', id:Date.now()},
]


import { useState } from "react"

const exercise11 = ({Usuarios} : Props) =>{
    const[users, setUsers] = useState<Usuario[]>(Usuarios)
    const[id, setId] = useState<number | null>(null)
    const[searching, setSearching] = useState<boolean>(false)
    const[foundUser, setFoundUser] = useState<Usuario | null>(null)

    const[name, setName] = useState<string>('')
    const[age, setAge] = useState<number>(0)
    const[rol, setRol] = useState<'user' | 'admin' | null>(null)



    const handleSearchUser= (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue= e.target.value.toLowerCase()
        setName(inputValue)

        if (inputValue === '') {
        setSearching(false)
        setFoundUser(null)
        setId(null)
        setRol('user')
        return
    }

        const SearchUser = users.find(u => u.Nombre.toLowerCase() === inputValue)

        if (SearchUser){
        setSearching(true)
        setFoundUser(SearchUser)
        setId(SearchUser.id)
        setRol(SearchUser.Rol)
        }else{
            setSearching(false)
            setFoundUser(null)
        }
    }
    return(
        <>
        <div>
            <h1>Este componente te deja filtrar usuarios y verlos segun lo busques!</h1>
            <p>Busca un usuario aqui: </p>

            <div>
                <p>Buscar usuario</p>
                <input value = {name} onChange={handleSearchUser} placeholder='Buscar usuaro'></input>

                {searching && foundUser ?
                (<>
                <div>
                    <ul>
                    {users.map((u) =>(
                        <li key={foundUser.id}>
                            {`Usuario Encontrado! : ${foundUser.Nombre} (${foundUser.Edad} - ${foundUser.Rol})`}
                        </li>
                    ))}
                    </ul>
                </div>
                </>
                ):(
                <>
                <div>
                    <ul>
                    {users.map((u) =>(
                        <li key={u.id}>
                            {`Usuario: ${u.Nombre} (${u.Edad}) - ${u.Rol}`}
                        </li>
                    ))}
                </ul>
                </div>
                </>) }

            </div>
        </div>
        </>
    )
}