type Usuario = {
    Id: number
    Name: string
    Age: number
    Role: 'user' | 'admin'
}

type FormData = {
    name:string
    age:number
    role:'user' | 'admin'
}

type Props = {
    Usuarios: Usuario[] 
}

const Usuarios: Usuario[] = [
    {Id:Date.now(), Name: 'Kevin', Age:21, Role:'admin'},
    {Id:Date.now(), Name: 'Alonso', Age:19, Role:'user'},
    {Id:Date.now(), Name: 'Mark', Age:24, Role:'user'},
]

import {useState} from 'react'

const Exercise12 = ({Usuarios} : Props) => {
    const[users, setUsers] = useState<Usuario[]>(Usuarios)
    const[searching, setSearching] = useState<boolean>(false)
    const[id, setId] = useState<number | null>(null)

    const[formData, setFormData] = useState<FormData>({
        name:'',
        age:0,
        role:'user'
    })

    const handleSearchForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {name, value} = e.target;

        if (!['name', 'age', 'role'].includes(name)) return;

        else{
        setFormData(prev =>({
            ...prev,
            [name] : name==='age' ? Number(value) : value
        }))
        }
    }

    const filterData = users.filter(user =>
    (formData.name=== "" || user.Name.toLowerCase().includes(formData.name.toLowerCase())) &&
    (formData.age === 0 || user.Age >= formData.age) &&
    (formData.role === null || user.Role === formData.role)

    )

    return(
        <>
        <div>
            <h1>Este componente filtra segun varios criterios!</h1>
            <div>
                <p>Busca un usuario:</p>
                <form>
                <input name='name'
                 value={formData.name}
                 placeholder='Nombre del usuario'
                 onChange={handleSearchForm}></input>
                <input
                 type='number'
                 name='age'
                 value={formData.age}
                 placeholder='Edad del usuario'
                 onChange={handleSearchForm}></input>
                <select name='role' value={formData.role} onChange={handleSearchForm}>
                    <option value='user'>Usuario</option>
                    <option value='admin'>Administrador</option>
                </select>
                </form>
            </div>

            <div>
                <h2>Estos son los resultados de la busqueda:
                    {filterData.map(user =>
                        (<div key={user.Id}>
                            <p>Nombre: {user.Name}</p>
                            <p>Edad: {user.Age}</p>
                            <p>Rol: {user.Role}</p>
                        </div>)
                    )}
                </h2>
            </div>
        </div>
        </>
    )
}
