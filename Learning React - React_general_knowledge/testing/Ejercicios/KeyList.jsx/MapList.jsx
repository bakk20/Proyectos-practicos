import React from 'react'

const Comidas =[
    {id: 1, nombre: 'Aji de pollo'},
    {id: 2, nombre: 'Sopa de arina de Arberja'},
    {id: 3, nombre: 'Pollo frito'}
]

const Tareas =[
  {id:1, nombre:'Levantarme Temprano'},
  {id:2, nombre:'Desayuna Bien'},
  {id:3, nombre:'Ejercitate(Min. 2 reps c/ejercicio)'},
  {id:4, nombre:'Estudia (Max. 5H, Min. 3H'},
  {id:5, nombre:'Busca Trabajo'},
  {id:6, nombre:'Pasa tiempo con ella <3 🦔🌹🦆'},
]
/*Es importante asignar una key a cada elemento del array, de no ser asi se hara errores al llamar
datos usando la key o cambiando/eliminando la misma*/
export const MapList = () => {
  return (
    <div>
        <h1>Estas son dos listas diferentes que contienen informacion relevante, luego mostrada usando map</h1>
        <ul>
            {Comidas.map(comida =>(
                <li key={comida.id}> {comida.nombre}</li>
            ))}
        </ul>

        <ul>
          {Tareas.map(tareas =>(
            <li key={tareas.id}>{tareas.nombre}</li>
          ))}
        </ul>
    </div>
  )
}
