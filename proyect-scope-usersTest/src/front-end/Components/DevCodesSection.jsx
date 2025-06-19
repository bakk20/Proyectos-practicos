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
        <h3 className='card-tittle'>Proceso de aprendizaje</h3>
        <div className='card-text'>
          Como objetivo de la pagina, este lugar sera un repositorio que redirige
          mis repositorios git aqui.
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