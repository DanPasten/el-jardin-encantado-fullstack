import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const Tienda = ({ agregarAlCarrito, productos }) => {
  const [busqueda, setBusqueda] = useState("");
  const [filtroPrecio, setFiltroPrecio] = useState("todos");

  // Lógica de filtrado
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    let coincidePrecio = true;
    if (filtroPrecio === "menos-35") {
      coincidePrecio = producto.precio < 35000;
    } else if (filtroPrecio === "mas-35") {
      coincidePrecio = producto.precio >= 35000;
    }
    return coincideNombre && coincidePrecio;
  });

  return (
    <div className="fade-in"> {/* Animación de entrada */}
      
      {/* 1. HERO BANNER DE LA TIENDA */}
      <header className="store-header text-center">
        <div>
          <h1 className="display-4 fw-bold">Nuestra Colección</h1>
          <p className="lead fs-4">Encuentra el detalle perfecto para cada ocasión</p>
        </div>
      </header>

      <div className="container" style={{ marginTop: '-50px' }}> {/* Sube un poco para solaparse con el banner */}
        
        {/* 2. BARRA DE FILTROS FLOTANTE */}
        <div className="card filter-card mb-5">
          <div className="row g-3 align-items-center">
            
            {/* Buscador */}
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-0">🔍</span>
                <input 
                  type="text" 
                  className="form-control search-input-custom border-0" 
                  placeholder="¿Qué flor buscas hoy?" 
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>

            {/* Filtros de Precio */}
            <div className="col-md-7 d-flex justify-content-md-end gap-2 flex-wrap">
              <span className="text-muted align-self-center me-2 d-none d-lg-block">Filtrar por:</span>
              
              <button 
                className={`btn rounded-pill px-3 ${filtroPrecio === 'todos' ? 'btn-primary' : 'btn-light text-muted'}`}
                onClick={() => setFiltroPrecio("todos")}
              >
                Todas 🌹
              </button>
              <button 
                className={`btn rounded-pill px-3 ${filtroPrecio === 'menos-35' ? 'btn-primary' : 'btn-light text-muted'}`}
                onClick={() => setFiltroPrecio("menos-35")}
              >
                Económicas 💸
              </button>
              <button 
                className={`btn rounded-pill px-3 ${filtroPrecio === 'mas-35' ? 'btn-primary' : 'btn-light text-muted'}`}
                onClick={() => setFiltroPrecio("mas-35")}
              >
                Premium 💎
              </button>
            </div>
          </div>
        </div>

        {/* 3. GRILLA DE PRODUCTOS */}
        <div className="row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <ProductCard 
                  key={producto.id} 
                  producto={producto} 
                  agregarAlCarrito={agregarAlCarrito} 
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="display-1">🥀</div>
              <h3 className="text-muted mt-3">Ups, no encontramos esa flor.</h3>
              <p>Intenta con otro nombre o cambia el filtro de precio.</p>
              <button 
                className="btn btn-outline-primary mt-3 rounded-pill"
                onClick={() => { setBusqueda(""); setFiltroPrecio("todos"); }}
              >
                Ver todo el catálogo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tienda;