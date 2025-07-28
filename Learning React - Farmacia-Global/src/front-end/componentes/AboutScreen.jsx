import React from 'react'
import '../styles/AboutUs.css';


export const AboutScreen = () => {
  return (
    <>
    <div className='showcase-card Aboutus'>
      <div className='showcase-card-grid '>
        <div className='showcase-card-text Aboutus-text'>¿Quienes somos?</div>
        <div className='showcase-card-container'>
          <div className='showcase-card-container image'> Imagen Aqui</div>
          <div className='showcase-card-container description'>
            <div className='description-text-aboutus'>Descripcion aqui</div></div>
          </div>
        
      </div>
    </div>
    <div className='showcase-card-fundators'>
      <div className='showcase-card-text fundators-text'>Fundadores</div>
      <div className='showcase-card-container'>
        <div className='showcase-card-grid fundators-grid'>
            <div className='card-text'> Nombre Aqui</div>
            <div className='profile-container fundators-profile-image'></div>
            <div className='card-text'>Descripcion Aqui</div>
            <div className='showcase-card-grid fundators-description'>Aqui ira la descripcion del fundador</div>
        </div>
        <div className='showcase-card-grid fundators-grid extra'>
            <div className='card-text'>Nombre Aqui</div>
            <div className='profile-container fundators-profile-image'></div>
            <div className='card-text'>Descripcion Aqui</div>
            <div className='showcase-card-grid fundators-description'>Aqui ira la descripcion del fundador</div>
        </div>
        <div className='showcase-card-grid fundators-grid'>
            <div className='card-text'>Nombre Aqui</div>
            <div className='profile-container fundators-profile-image'></div>
            <div className='card-text'>Descripcion Aqui</div>
            <div className='showcase-card-grid fundators-description'>Aqui ira la descripcion del fundador</div>
        </div>
      </div>
    </div>

    <div className='showcase-card-fundators fundators-vision-config'>
      <div className='showcase-card-text fundators-text'>Que Queremos Ser</div>
      <div className='showcase-card-grid fundators-future'>
        <div className='card-text'>sample</div>
        <div className='profile-container fundators-vision'></div>
      </div>
    </div>
    

    </>
  )
}

