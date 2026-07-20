import { useState } from 'react'
import { GetGit } from './GetGit'
import { RicksitoDemo } from './RicksitoDemo'
import { Link } from 'react-router-dom'
import '../styles/ProjectsScreen.css'

const PROJECTS = [
  { id: 'ricksito', name: 'Ricksito', tag: 'Automatización + IA' },
  { id: 'farmacia', name: 'Catálogo de Farmacia', tag: 'Full-stack' },
  { id: 'plataforma', name: 'Plataforma de Usuarios', tag: 'Full-stack' },
  { id: 'dashboard', name: 'Dashboard de Tareas', tag: 'Frontend' },
  { id: 'github', name: 'Código en GitHub', tag: 'Repositorio' },
]

function ProjectDetail({ id }) {
  switch (id) {
    case 'ricksito':
      return (
        <div>
          <h3 className="card-title">Ricksito</h3>
          <p className="card-text">
            Bot de pedidos por WhatsApp para Amoroma, una heladería real en Comas, Lima.
            Abajo, una demo con conversación de ejemplo del flujo real: pedido, carrito y
            verificación de pago.
          </p>
          <RicksitoDemo />
          <p className="card-text" style={{ marginTop: '1rem' }}>
            <Link to="/ricksito">Ver el caso de estudio completo →</Link>
          </p>
        </div>
      )
    case 'farmacia':
      return (
        <div>
          <h3 className="card-title">Catálogo de Farmacia</h3>
          <p className="card-text">
            SPA con React + Vite, backend en Node.js + Express + MongoDB (Mongoose),
            autenticación JWT, manejo de estado con Redux Toolkit, subida de imágenes con
            Multer, y un sistema de plantillas para armar secciones del catálogo sin tocar
            código.
          </p>
        </div>
      )
    case 'plataforma':
      return (
        <div>
          <h3 className="card-title">Plataforma de Usuarios</h3>
          <p className="card-text">
            Login/registro con JWT, contexto de autenticación, rutas protegidas y panel de
            administración. De hecho, este mismo portafolio nació como una variante de ese
            proyecto — lo estás viendo ahora.
          </p>
        </div>
      )
    case 'dashboard':
      return (
        <div>
          <h3 className="card-title">Dashboard de Tareas</h3>
          <p className="card-text">
            Tablero con drag & drop (dnd-kit + react-grid-layout), Next.js con backend en
            TypeScript, estilos con Tailwind CSS y manejo de estado con Redux Toolkit.
          </p>
        </div>
      )
    case 'github':
      return (
        <div>
          <h3 className="card-title">Código en GitHub</h3>
          <p className="card-text">Navegá directo mi repositorio de proyectos prácticos.</p>
          <GetGit />
        </div>
      )
    default:
      return null
  }
}

export const ProjectsScreen = () => {
  const [selected, setSelected] = useState('ricksito')

  return (
    <div className="projects-screen">
      <div className="projects-list component-card">
        {PROJECTS.map((p) => (
          <button
            key={p.id}
            className={`project-item ${selected === p.id ? 'active' : ''}`}
            onClick={() => setSelected(p.id)}
          >
            <span className="project-item-name">{p.name}</span>
            <span className="project-item-tag">{p.tag}</span>
          </button>
        ))}
      </div>

      <div className="projects-detail component-card">
        <ProjectDetail id={selected} />
      </div>
    </div>
  )
}
