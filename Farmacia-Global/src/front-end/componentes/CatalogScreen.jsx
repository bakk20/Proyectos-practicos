import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddTemplateButton } from '../componentes/AddTemplateButton';
import { TemplateOverlay } from '../componentes/TemplateOverlay';
import { TemplateRenderer } from '../componentes/TemplateRenderer';
import { ProductList } from '../componentes/ProductList';

export const CatalogScreen = () => {
  const [sections, setSections] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [initialData, setInitialData] = useState(null);

  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    axios.get('http://localhost:5000/api/catalog')
      .then(res => setSections(res.data))
      .catch(err => console.error('Error al cargar secciones', err));
  }, []);

  const handleEdit = (index) => {
    setInitialData(sections[index]);
    setEditingIndex(index);
    setShowOverlay(true);
  };

  const handleAddSection = (newSection) => {
    setSections([...sections, newSection]);
    setShowOverlay(false);
  };

  const handleEditPorNombre = (nombreSeccion) => {
    const index = sections.findIndex(seccion => seccion.nombre === nombreSeccion);
    if (index !== -1) {
      setInitialData(sections[index]);
      setEditingIndex(index);
      setShowOverlay(true);
    }
  };

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/catalog/${id}`);
    const nuevas = sections.filter(sec => sec._id !== id);
    setSections(nuevas);
    setShowOverlay(false);
    setEditingIndex(null);
    setInitialData(null);
  } catch (err) {
    console.error('Error al eliminar sección:', err);
  }
};

const handleOverlaySubmit = async (formData) => {
  try {
    const isFormData = formData instanceof FormData;

    if (editingIndex !== null) {
      const id = sections[editingIndex]._id;

      const res = await axios.put(`http://localhost:5000/api/catalog/${id}`, formData, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
      });

      const nuevas = [...sections];
      nuevas[editingIndex] = res.data;
      setSections(nuevas);
      setEditingIndex(null);
    } else {
      const res = await axios.post('http://localhost:5000/api/catalog', formData, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
      });

      setSections([...sections, res.data]);
    }

    setInitialData(null);
    setShowOverlay(false);
  } catch (err) {
    console.error('Error al guardar/editar sección:', err);
  }
};
  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      {/* Secciones tipo bundle */}
      {sections
        .filter(section => section.tipoSeccion === 'bundle')
        .map((section, index) => (
          <TemplateRenderer
            key={index}
            data={section}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
            isAdmin={isAdmin}
          />
        ))}

      {/* Lista de productos individuales con filtro */}
      <ProductList
        secciones={sections}
        onEditProducto={handleEditPorNombre}
        isAdmin={isAdmin}
      />

      {/* Botón para añadir sección */}
      {isAdmin && (
        <AddTemplateButton onClick={() => setShowOverlay(true)} />
      )}

      {/* Overlay de creación/edición */}
      {showOverlay && (
        <TemplateOverlay
          onClose={() => {
            setShowOverlay(false);
            setInitialData(null);
            setEditingIndex(null);
          }}
          onSubmit={handleOverlaySubmit}
          onDelete={handleDelete}  
          initialData={initialData}
        />
      )}
    </div>
  );
};