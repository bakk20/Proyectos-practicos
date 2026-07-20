import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/CheckoutScreen.css';

export const OrderConfirmationScreen = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/${id}`)
      .then((res) => setOrden(res.data))
      .catch(() => setError('No pudimos encontrar ese pedido.'));
  }, [id]);

  if (error) {
    return (
      <div className="checkout-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (!orden) {
    return (
      <div className="checkout-screen">
        <p>Cargando pedido...</p>
      </div>
    );
  }

  return (
    <div className="checkout-screen">
      <h2>¡Pedido confirmado! ✅</h2>
      <p className="checkout-note">Pedido #{orden._id.slice(-6).toUpperCase()}</p>
      <p>
        Gracias, {orden.cliente.nombre}. Tu pedido llega a: {orden.cliente.direccion}.
      </p>

      <div className="cart-items">
        {orden.items.map((item, i) => (
          <div key={i} className="cart-item cart-item-confirmacion">
            <p className="cart-item-desc">{item.nombre}</p>
            <p>
              {item.cantidad} x S/ {item.precio.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <span>Total pagado (simulado)</span>
        <span>S/ {orden.total.toFixed(2)}</span>
      </div>

      <Link to="/catalog" className="cart-link-catalog">Seguir comprando</Link>
    </div>
  );
};
