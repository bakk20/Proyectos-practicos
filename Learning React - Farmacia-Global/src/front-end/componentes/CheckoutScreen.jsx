import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import '../styles/CheckoutScreen.css';

export const CheckoutScreen = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [metodoPago, setMetodoPago] = useState('Yape (simulado)');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <div className="checkout-screen">
        <h2>Checkout</h2>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !direccion) {
      setError('Completa nombre y dirección.');
      return;
    }

    setEnviando(true);
    setError('');

    try {
      const payload = {
        items: items.map((i) => ({
          nombre: i.descripcion,
          precio: i.precio,
          cantidad: i.cantidad,
        })),
        total,
        cliente: { nombre, direccion, telefono },
        metodoPago,
      };

      const res = await axios.post('http://localhost:5000/api/orders', payload);
      clearCart();
      navigate(`/pedido-confirmado/${res.data._id}`);
    } catch (err) {
      console.error('Error al crear el pedido:', err);
      setError('No se pudo procesar el pedido. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="checkout-screen">
      <h2>Checkout</h2>
      <p className="checkout-note">
        Pago simulado — no se procesa ningún cobro real, es solo para demostrar el flujo completo.
      </p>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>Nombre completo</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Dirección de entrega</label>
        <input value={direccion} onChange={(e) => setDireccion(e.target.value)} required />

        <label>Teléfono (opcional)</label>
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />

        <label>Método de pago</label>
        <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
          <option value="Yape (simulado)">Yape (simulado)</option>
          <option value="Plin (simulado)">Plin (simulado)</option>
          <option value="Tarjeta (simulado)">Tarjeta (simulado)</option>
        </select>

        <div className="checkout-total">
          <span>Total a pagar</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>

        {error && <p className="checkout-error">{error}</p>}

        <button type="submit" className="checkout-submit-button" disabled={enviando}>
          {enviando ? 'Procesando...' : 'Confirmar pedido'}
        </button>
      </form>
    </div>
  );
};
