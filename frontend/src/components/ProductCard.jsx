import React from 'react';

const ProductCard = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="col-md-4 mb-4">
      {/* CAMBIO CLAVE: Agregamos la clase "card-producto" aquí.
          Esta clase activa las animaciones que definimos en App.css 
      */}
      <div className="card h-100 shadow-sm card-producto">
        
        <img 
            src={producto.imagen} 
            className="card-img-top" 
            alt={producto.nombre} 
            style={{ height: '250px', objectFit: 'cover' }} 
        />
        
        <div className="card-body d-flex flex-column text-center">
          <h5 className="card-title fw-bold">{producto.nombre}</h5>
          
          <p className="card-text text-muted small">
            {producto.descripcion || "Una hermosa selección de flores frescas para alegrar el día."}
          </p>
          
          <h4 className="card-subtitle mb-3 text-success">
            ${producto.precio.toLocaleString('es-CL')}
          </h4>
          
          <button 
            className="btn btn-outline-primary mt-auto rounded-pill fw-bold"
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al Carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;