import React, { useState } from 'react';
import '../styles/ProductItem.css';
import '../styles/ProductList.css';
import { etiquetasDisponibles } from '../Data/EtiquetasProductos';
import { useCart } from '../context/CartContext';


export const ProductList = ({ secciones = [], onEditProducto, isAdmin }) => {
  const [filtroEtiqueta, setFiltroEtiqueta] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const { addToCart } = useCart();

  const productos = secciones
    .filter(seccion => seccion.tipoSeccion === 'producto')
    .flatMap(seccion =>
      seccion.bloques.map((bloque, index) => ({
        ...bloque,
        nombre: seccion.nombre,
        id: `${seccion.nombre}-${index}`,
        numero: index + 1
      }))
    );

  const productosFiltrados = productos.filter(p => {
    const coincideEtiqueta = filtroEtiqueta ? p.etiqueta === filtroEtiqueta : true;
    const coincideBusqueda = busqueda
      ? p.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
      : true;
    return coincideEtiqueta && coincideBusqueda;
  });

  return (
    <div className="catalogo-flex">
      {/* Columna izquierda */}
      <div className="catalogo-filtros">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="etiquetas-disponibles">
          {etiquetasDisponibles.map((etiqueta, index) => (
            <button
              key={index}
              className={`etiqueta-btn ${filtroEtiqueta === etiqueta ? 'activa' : ''}`}
              onClick={() => setFiltroEtiqueta(etiqueta)}
            >
              {etiqueta}
            </button>
          ))}
          {filtroEtiqueta && (
            <button className="limpiar-filtro" onClick={() => setFiltroEtiqueta('')}>
              Quitar filtro
            </button>
          )}
        </div>
      </div>

      {/* Columna derecha */}
      <div className="catalogo-productos-scroll">
        {productosFiltrados.map((producto, index) => (
          <div className="product-item" key={producto.id}>
            <div className="product-item-img">
                <img src={`http://localhost:5000/uploads/${producto.imagen}`} alt="Producto" />
            </div>
            <div className="product-item-info">
              <h3>{producto.descripcion}</h3>
              <p>Etiqueta: {producto.etiqueta}</p>
              <p>Pertenece a: {producto.nombre}</p>
              <p className="product-item-precio">S/ {Number(producto.precio || 0).toFixed(2)}</p>
              <button
                className="product-add-button"
                onClick={() =>
                  addToCart({
                    id: producto.id,
                    descripcion: producto.descripcion,
                    precio: Number(producto.precio || 0),
                    imagen: producto.imagen,
                  })
                }
              >
                Agregar al carrito
              </button>
              {isAdmin && onEditProducto && (
                <button className="product-edit-button" onClick={() => onEditProducto(producto.nombre)}>
                  Editar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};