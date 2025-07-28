import React from 'react'
import { ImageCarousel } from './ImageCarousel'
import '../../styles/MainScreen.css';
import { ProductosNuevos } from '../ProductosNuevos';
import {LogoCarousel} from './LogoCarousel';

export const MainScreen = () => {
  return (
    <>
      <div className='showcase-card'>
        <div className='showcase-card-description'>
          <div className='description-text'>¿Que hay de nuevo?</div>
        </div>
        <div>
          <ImageCarousel/>
        </div>
      </div>
      <div>
        <ProductosNuevos/>
      </div>

      <div>
      <LogoCarousel/>
      </div>
    </>
  )
}
