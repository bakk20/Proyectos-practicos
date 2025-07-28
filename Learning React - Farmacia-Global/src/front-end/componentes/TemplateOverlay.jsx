import React, { useState, useEffect } from 'react';
import { etiquetasDisponibles } from '../Data/EtiquetasProductos';
import { tiposDeSeccion } from '../Data/TiposSeccion';
import { etiquetasSeccion } from '../Data/EtiquetasSeccion';
import '../styles/TemplateOverlay.css';

export const TemplateOverlay = ({ onClose, onSubmit, initialData, onDelete }) => {
  const [tipoSeccion, setTipoSeccion] = useState(initialData?.tipoSeccion || 'bundle');
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [etiquetaGeneral, setEtiquetaGeneral] = useState(initialData?.etiquetaGeneral || '');
  const [bloques, setBloques] = useState(
    initialData?.bloques || [{ imagen: '', descripcion: '', etiqueta: '' }]
  );

  // ✅ Solo limpiar bloques si no estamos editando (para evitar reseteo)
  useEffect(() => {
    if (tipoSeccion === 'producto' && !initialData) {
      setBloques([{ imagen: '', descripcion: '', etiqueta: '' }]);
    }
  }, [tipoSeccion]);

  const handleAddBloque = () => {
    if (bloques.length >= 6) return;
    setBloques([...bloques, { imagen: '', descripcion: '', etiqueta: '' }]);
  };

  const handleChangeBloque = (index, field, value) => {
    const nuevos = [...bloques];
    nuevos[index][field] = value;
    setBloques(nuevos);
  };

  const handleRemoveBloque = (index) => {
    const nuevos = [...bloques];
    nuevos.splice(index, 1);
    setBloques(nuevos);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const nuevos = [...bloques];
    [nuevos[index - 1], nuevos[index]] = [nuevos[index], nuevos[index - 1]];
    setBloques(nuevos);
  };

  const handleMoveDown = (index) => {
    if (index === bloques.length - 1) return;
    const nuevos = [...bloques];
    [nuevos[index + 1], nuevos[index]] = [nuevos[index], nuevos[index + 1]];
    setBloques(nuevos);
  };

 const handleSubmit = () => {
  const formData = new FormData();

  formData.append('tipoSeccion', tipoSeccion);
  formData.append('nombre', nombre);
  if (tipoSeccion === 'bundle') {
    formData.append('etiquetaGeneral', etiquetaGeneral);
  }

  const bloquesParaEnviar = bloques.map((bloque, index) => {
    if (bloque.imagen instanceof File) {
      formData.append(`imagen_${index}`, bloque.imagen);
      return {
        descripcion: bloque.descripcion,
        etiqueta: bloque.etiqueta,
        imagen: ''
      };
    } else {
      return {
        descripcion: bloque.descripcion,
        etiqueta: bloque.etiqueta,
        imagen: bloque.imagen
      };
    }
  });

  formData.append('bloques', JSON.stringify(bloquesParaEnviar));

  onSubmit(formData); // ✅ Esta es la que llega al CatalogScreen
};

const handleDeleteClick = () => {
        if (initialData?._id) {
          onDelete(initialData._id);
        }
      };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>{initialData ? 'Editar' : 'Crear'} {tipoSeccion === 'producto' ? 'Producto' : 'Bundle'}</h2>

        <label>Tipo de sección:</label>
        <select value={tipoSeccion} onChange={(e) => setTipoSeccion(e.target.value)}>
          <option value="bundle">Bundle</option>
          <option value="producto">Producto</option>
        </select>

        <label>Nombre:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

        {tipoSeccion === 'bundle' && (
          <>
            <label>Etiqueta general:</label>
            <select value={etiquetaGeneral} onChange={(e) => setEtiquetaGeneral(e.target.value)}>
              <option value="">Selecciona etiqueta</option>
              {etiquetasDisponibles.map((etiqueta, i) => (
                <option key={i} value={etiqueta}>{etiqueta}</option>
              ))}
            </select>
          </>
        )}

        <div className="bloques-wrapper">
          {bloques.map((bloque, index) => (
            <div key={index} className="bloque">
              <label>Imagen:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleChangeBloque(index, 'imagen', file);
                }}
              />
              {bloque.imagen && (
                <img
                  src={
                    typeof bloque.imagen === 'string'
                      ? `http://localhost:5000/uploads/${bloque.imagen}`
                      : URL.createObjectURL(bloque.imagen)
                  }
                  alt="Vista previa"
                  className="preview-img"
                />
              )}

              <label>Descripción:</label>
              <input
                value={bloque.descripcion}
                onChange={(e) => handleChangeBloque(index, 'descripcion', e.target.value)}
              />

              <label>Etiqueta del producto:</label>
              <select
                value={bloque.etiqueta}
                onChange={(e) => handleChangeBloque(index, 'etiqueta', e.target.value)}
              >
                <option value="">Selecciona etiqueta</option>
                {etiquetasDisponibles.map((etiqueta, i) => (
                  <option key={i} value={etiqueta}>{etiqueta}</option>
                ))}
              </select>

              {tipoSeccion === 'bundle' && (
                <div className="bloque-buttons">
                  <button onClick={() => handleMoveUp(index)}>↑</button>
                  <button onClick={() => handleMoveDown(index)}>↓</button>
                  <button onClick={() => handleRemoveBloque(index)}>Eliminar</button>
                </div>
              )}
            </div>
          ))}

          {tipoSeccion === 'bundle' && bloques.length < 6 && (
            <button className="agregar-bloque-btn" onClick={handleAddBloque}>
              + Agregar producto
            </button>
          )}
        </div>

        <div className="overlay-actions">
          <button onClick={handleSubmit}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>

          {initialData && (
            <button
              onClick={handleDeleteClick}
              className="delete-btn"
              style={{
                marginTop: '1rem',
                backgroundColor: '#ff4d4d',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              🗑️ Borrar sección
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
