import React from 'react';
import  '../styles/ProductItem.css';

export const ProductItem = ({ imagen, descripcion, etiqueta, templateNombre }) => {
  return (
    <div className="product-item">
      <div className="product-item-img">
        {imagen ? <img src={imagen} alt={etiqueta} /> : <span>Sin imagen</span>}
      </div>
      <div className="product-item-info">
        <p className="product-item-desc">{descripcion}</p>
        <p className="product-item-etiqueta">Etiqueta: {etiqueta}</p>
        <p className="product-item-template">Sección: {templateNombre}</p>
      </div>
    </div>
  );
};
