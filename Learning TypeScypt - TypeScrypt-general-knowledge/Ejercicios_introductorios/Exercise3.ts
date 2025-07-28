/*Esto es ts puro, primero hacemos el prop*/

//Es importante el nombre del type, es mejor poner "Usuario" por comodidad y lectura del codigo
type Usuario = {
    Nombre: string
    Edad: number
    Correo: string
}

//ahora creamos la function en el mismo ts

function describirUsuario (usuario: Usuario): string {
    return `El nombre del usuario es ${usuario.Nombre}, su edad es ${usuario.Edad} y su correo es ${usuario.Correo}`
}
export default describirUsuario

//Aqui la logica la tomo como: el usuario (o arg antes del type) tomara los types del prop, luego llamaremos esta funcion
//En otro archivo y le asignaremos los datos.




//Luego llamamos la function
const kevin:Usuario ={
    Nombre:'Kevin',
    Edad: 21,
    Correo:'nodogsky@gmail.com'
}

console.log(describirUsuario(kevin))


/*Alternativamente, si usamos react:

function App () {
    const kevin:Usuario ={
    Nombre:'Kevin',
    Edad: 21,
    Correo:'nodogsky@gmail.com'
    }

    return(
    <>
        <div>
        <p>{descibeUsuario(kevin)}</p>
        </div>
    </>
    )
}
return default App

*/

