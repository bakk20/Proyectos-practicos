import { Link, NavLink, useNavigate } from "react-router-dom"
import {TiInfoLarge, TiNews, TiHome, TiShoppingCart} from 'react-icons/ti'
import logofarmacia from '../../assets/Logo-farmacia.png';
import { useCart } from '../context/CartContext';
import  '../styles/Layout.css';


const Navbar = () => {
  const { cantidadTotal } = useCart();

  return (
    <>
    <div className="Navbar">
    <div className="Logo-empresa">
        <img  src={logofarmacia} className="Logo-empresa" alt="logo-empresa"/>
    </div>
        <nav className="navbar-config">
            <NavLink to='/'><button className="Nav-button"><TiHome/> Inicio </button></NavLink>
            <NavLink to='/catalog'><button className="Nav-button"><TiNews/> Catalogo </button></NavLink>
            <NavLink to='/aboutus'><button className="Nav-button"><TiInfoLarge/> Nosotros </button></NavLink>
            <NavLink to='/cart'>
              <button className="Nav-button Nav-button-cart">
                <TiShoppingCart/> Carrito
                {cantidadTotal > 0 && <span className="cart-badge">{cantidadTotal}</span>}
              </button>
            </NavLink>
        </nav>
    </div>
    </>
  )
}

export default Navbar