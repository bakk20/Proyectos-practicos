// DevCodesSection.jsx
import '../styles/GeneralStyles.css'
import { GetGit } from './GetGit'
//import PageTransition from './PageTransition.jsx';

export const DevCodesSection = () => {
  return (
    <>
    {/*<PageTransition>*/}
      <div className='getgit-wrapper'>

      <div className='component-card'>
        <h3 className='card-title'>Proyectos</h3>
        <div className='card-text'>
          Navegá directo mi repositorio de proyectos prácticos en GitHub: carpetas y
          archivos reales, sin intermediarios.
        </div>
        <div className="component-card getgit-navigation">
          <GetGit />
        </div>
      </div>
      </div>
      {/*</PageTransition>*/}
    </>
  )
}