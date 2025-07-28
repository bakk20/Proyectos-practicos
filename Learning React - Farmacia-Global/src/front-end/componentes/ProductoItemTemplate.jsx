import React, { useState } from 'react';
import '../styles/ProductItem.css';
import '../styles/ProductList.css';
import { etiquetasDisponibles } from '../Data/EtiquetasProductos';

export const ProductList = ({ productos = [], onEditProducto }) => {
  const [filtroEtiqueta, setFiltroEtiqueta] = useState('');

  const productosFiltrados = filtroEtiqueta
    ? productos.filter(p => p.etiqueta === filtroEtiqueta)
    : productos;

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Lista de productos</h2>

      <div className="filtro-etiquetas">
        <label htmlFor="filtro">Filtrar por etiqueta:</label>
        <select
          id="filtro"
          value={filtroEtiqueta}
          onChange={(e) => setFiltroEtiqueta(e.target.value)}
        >
          <option value="">Todas</option>
          {etiquetasDisponibles.map((etiqueta, index) => (
            <option key={index} value={etiqueta}>{etiqueta}</option>
          ))}
        </select>
      </div>

      {productosFiltrados.length === 0 ? (
        <p>No hay productos que coincidan con esta etiqueta.</p>
      ) : (
        productosFiltrados.map((producto, index) => (
          <div
            className="product-item"
            key={producto.id || `${producto.nombre}-${index}`}
            onClick={() => onEditProducto?.(producto.nombreSeccion)}
            style={{ cursor: 'pointer' }}
          >
            <div className="product-item-img">
              <img src={producto.imagen} alt="Producto" />
            </div>
            <div className="product-item-info">
              <h3>{producto.descripcion}</h3>
              <p>Etiqueta: {producto.etiqueta}</p>
              <p>Pertenece a: {producto.nombre || producto.nombreSeccion}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

