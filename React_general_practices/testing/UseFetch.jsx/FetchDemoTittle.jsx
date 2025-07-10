import React from 'react'
import {useState, useEffect} from 'react'

export const FetchDemoTittle = () => {
    const[post, setPost] = useState=([])
    const[cargando, setCargando] = useState(true)
    const[error, setError] = useState(null)

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data =>{
        setPost(data)
        setCargando(false)
      })

    .catch(() =>{
        setError('El fetch fallo o no se pudo leer!')
        setCargando(false)
      })

    }, [])
    if(cargando) return <div><p>Cargando...</p></div>
    if(error) return <div><p>{error}</p></div>
    
  return (
    <>
    <div>
        <h1>Este programa hace un fetch y llama posts en una lista</h1>
    </div>
    <div>
        <ul>
            {post.map(postData =>{
                <li key={postData.id}>{postData.title}</li>
            })}
        </ul>
    </div>
    </>
  )
}
