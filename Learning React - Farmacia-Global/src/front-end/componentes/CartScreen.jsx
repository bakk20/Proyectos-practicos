import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartScreen.css';

export const CartScreen = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-screen">
        <h2>Tu carrito</h2>
        <p>Todavía no agregaste productos.</p>
        <Link to="/catalog" className="cart-link-catalog">Ir al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="cart-screen">
      <h2>Tu carrito</h2>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-img">
              {item.imagen ? (
                <img src={`http://localhost:5000/uploads/${item.imagen}`} alt={item.descripcion} />
              ) : (
                <span>Sin imagen</span>
              )}
            </div>
            <div className="cart-item-info">
              <p className="cart-item-desc">{item.descripcion}</p>
              <p className="cart-item-precio">S/ {item.precio.toFixed(2)}</p>
            </div>
            <div className="cart-item-cantidad">
              <button onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
            </div>
            <p className="cart-item-subtotal">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
            <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>
              Quitar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <span>Total</span>
        <span>S/ {total.toFixed(2)}</span>
      </div>

      <button className="cart-checkout-button" onClick={() => navigate('/checkout')}>
        Ir a pagar
      </button>
    </div>
  );
};
