import React from 'react';
import { Link } from 'react-router-dom';
import WeatherWidget from './WeatherWidget'; // Importamos el componente del clima
import './Navigation.css'; // Importamos los estilos de alto contraste

const Navigation = ({ cantidadCarrito }) => {
  return (
    // 'sticky-top' hace que el menú se quede fijo arriba al bajar
    <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-white">
      <div className="container">
        
        {/* 1. MARCA / LOGO */}
        <Link className="navbar-brand" to="/">
          El Jardín Encantado 🌿
        </Link>

        {/* 2. BOTÓN HAMBURGUESA (Móvil) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 3. CONTENIDO DEL MENÚ */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/tienda">Tienda</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/login">Admin</Link>
            </li>

            {/* --- WIDGET DEL CLIMA (Se oculta en celulares muy pequeños para ahorrar espacio) --- */}
            <li className="nav-item d-none d-lg-block mx-2">
               <WeatherWidget />
            </li>

            {/* --- BOTÓN DEL CARRITO --- */}
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <Link className="btn btn-outline-primary position-relative rounded-pill px-3 fw-bold" to="/carrito">
                Carro
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cantidadCarrito}
                </span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;