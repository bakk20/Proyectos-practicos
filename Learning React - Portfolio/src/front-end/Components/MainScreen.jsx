import { Link } from 'react-router-dom'
import '../styles/GeneralStyles.css'

export const MainScreen = () => {
  return (
    <div className="component-card">
      <h3 className='card-title'>Hola, soy Kevin</h3>
      <p className='card-text'>
        Soy desarrollador frontend con React, y en los últimos meses me metí de lleno en
        automatización con IA: armé de cero un bot de pedidos por WhatsApp para un negocio
        real, usando n8n y varios modelos de lenguaje trabajando juntos.
      </p>
      <p className='card-text'>
        Esta página es mi portafolio, sin relleno. En <Link to="/ricksito">Ricksito</Link> cuento
        cómo armé ese proyecto paso a paso, y en <Link to="/proyectos">Proyectos</Link> podés
        navegar directo mi código en GitHub.
      </p>
    </div>
  )
}
