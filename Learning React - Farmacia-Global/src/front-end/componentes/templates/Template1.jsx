import React from 'react';
import '../../styles/Template1.css'; // si usas estilos

export const Template1 = ({ nombre, etiquetaGeneral, bloques, index, onEdit, onDelete, isAdmin }) => {

  const BACKEND = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="template1-container">
      <h2>{nombre}</h2>
      {etiquetaGeneral && <p><strong>{etiquetaGeneral}</strong></p>}

      <div className="bloques-list">
        {bloques.map((bloque, index) => (
          <div key={index} className="bloque-item">
            {console.log('IMAGEN:', bloque.imagen)}
            
            <img src={`${BACKEND}/uploads/${bloque.imagen}`} alt="Producto" />
            <p>{bloque.descripcion}</p>
            <small>{bloque.etiqueta}</small>
          </div>
        ))}
      </div>

      {/* Botones de administración */}
      {isAdmin && (
        <div className="template1-admin-buttons">
          <button onClick={onEdit}>✏️ Editar</button>
          <button onClick={onDelete}>🗑️ Borrar</button>
        </div>
      )}
    </div>
  );
};
