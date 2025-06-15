
import '../styles/GeneralStyles.css'
import { GetGit } from './GetGit'

export const DevCodesSection = () => {
  return (
      <>
        <div className="component-card">
          <h3 className='card-tittle'>Proceso de aprendizaje</h3>
          <p className='card-text'>Como objetivo de la pagina, este lugar sera un repositorio que redirige
            mis repositorios git aqui.
            <GetGit/>
          </p>
        </div>
      </>
  )
}

