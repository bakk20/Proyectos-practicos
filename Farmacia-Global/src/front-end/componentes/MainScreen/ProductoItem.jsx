// src/components/ProductoItem.jsx
import React from 'react';

export const ProductoItem = ({ imagen, descripcion }) => {
  return (
    <div className='showcase-card-tmp3-div'>
      <div className='showcase-card-tmp4'>
        <img
          src={imagen}
          alt='producto'
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
        />
      </div>
      <div className='showcase-card-tmp4'>
        <p style={{ color: 'white', textAlign: 'center', padding: '0 5px' }}>{descripcion}</p>
      </div>
    </div>
  );
};