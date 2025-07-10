import React from 'react';
import '../../styles/ContributorsCarousel.css';
import logofarmacia from '../../../assets/Logo-farmacia.png';

const logos = [
  logofarmacia,
  logofarmacia,
  logofarmacia,
  logofarmacia,
  logofarmacia,
];

export const LogoCarousel = () => {
  return (
    <>
    <div className='description-text'>Contribuidores</div>
    <div className="carousel-container-contrib">
      <div className="carousel-track-contrib">
        {logos.concat(logos).map((logo, index) => (
          <div className="carousel-item-contrib" key={index}>
            <img src={logo} alt={`contributor-${index}`} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};