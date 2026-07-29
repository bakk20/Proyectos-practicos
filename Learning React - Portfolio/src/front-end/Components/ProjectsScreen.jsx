import { useState } from 'react'
import { GetGit } from './GetGit'
import { RicksitoDemo } from './RicksitoDemo'
import { FarmaciaDemo } from './FarmaciaDemo'
import { Link } from 'react-router-dom'
import '../styles/ProjectsScreen.css'

const PROJECTS = [
  { id: 'ricksito', name: 'Ricksito', tag: 'Automatización + IA' },
  { id: 'farmacia', name: 'Catálogo de Farmacia', tag: 'Full-stack' },
  { id: 'plataforma', name: 'Plataforma de Usuarios', tag: 'Full-stack' },
  { id: 'dashboard', name: 'Dashboard de Tareas', tag: 'Frontend' },
  { id: 'landings', name: 'Landing Pages', tag: 'Diseño web' },
  { id: 'github', name: 'Código en GitHub', tag: 'Repositorio' },
]

const LANDINGS = [
  {
    href: '/landings/restaurante_landing.html',
    name: 'El Fogón de Lima',
    desc: 'Restaurante — menú, galería y reservas',
  },
  {
    href: '/landings/vuelos_landing.html',
    name: 'Vuela Andina',
    desc: 'Agencia de viajes — planes, destinos y equipo',
  },
  {
    href: '/landings/clinica_landing.html',
    name: 'Vitalis Salud',
    desc: 'Clínica médica — especialidades, equipo y testimonios',
  },
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
            Multer, un sistema de plantillas para armar secciones del catálogo sin tocar
            código, y carrito + checkout con pago simulado guardado en base de datos.
          </p>
          <FarmaciaDemo />
          <p className="card-text" style={{ marginTop: '1rem' }}>
            <Link to="/farmacia">Ver el caso de estudio completo →</Link>
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
    case 'landings':
      return (
        <div>
          <h3 className="card-title">Landing Pages</h3>
          <p className="card-text">
            Tres landing pages de práctica, hechas desde cero como piezas de diseño y
            desarrollo front-end independientes entre sí (sin plantillas ni builders),
            cada una con su propia paleta, estructura y animaciones.
          </p>
          <div className="landings-list">
            {LANDINGS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-item"
              >
                <span className="landing-item-name">{l.name}</span>
                <span className="landing-item-desc">{l.desc}</span>
              </a>
            ))}
          </div>
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
