import React from 'react';
import { Link } from 'react-router-dom';

const Carrito = ({ carrito, eliminarDelCarrito, vaciarCarrito, total }) => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="display-5">Tu Selección</h2>
        <p className="text-muted">Estás a un paso de tener belleza en tus manos.</p>
      </div>

      {carrito.length === 0 ? (
        <div className="text-center py-5 bg-white shadow-sm rounded">
          <div className="display-1 text-muted mb-3">🧺</div>
          <h3 className="mb-3">Tu cesta está vacía</h3>
          <p className="text-muted mb-4">Parece que aún no has elegido tus flores favoritas.</p>
          <Link to="/tienda" className="btn btn-primary px-4">Ir a la Tienda</Link>
        </div>
      ) : (
        <div className="row g-5">
          
          {/* LISTA DE ITEMS */}
          <div className="col-lg-8">
            <div className="table-responsive">
              <table className="table table-borderless align-middle table-elegant">
                <thead style={{borderBottom: '1px solid #eee'}}>
                  <tr>
                    <th style={{width: '50%'}}>Producto</th>
                    <th>Precio</th>
                    <th className="text-end">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item, index) => (
                    <tr key={index} style={{borderBottom: '1px solid #f9f9f9'}}>
                      <td className="py-4">
                        <div className="d-flex align-items-center">
                          <img 
                            src={item.imagen} 
                            alt={item.nombre} 
                            className="shadow-sm"
                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          <div className="ms-3">
                            <h6 className="mb-0 fw-bold text-dark">{item.nombre}</h6>
                            <small className="text-muted">{item.categoria || "Fresco"}</small>
                          </div>
                        </div>
                      </td>
                      <td className="fw-bold text-dark">${item.precio.toLocaleString('es-CL')}</td>
                      <td className="text-end">
                        <button 
                          className="btn btn-link text-danger text-decoration-none p-0"
                          onClick={() => eliminarDelCarrito(index)}
                        >
                          <small>ELIMINAR</small>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <button className="btn btn-outline-secondary btn-sm" onClick={vaciarCarrito}>VACIAR CESTA</button>
            </div>
          </div>

          {/* RESUMEN DE PAGO */}
          <div className="col-lg-4">
            <div className="bg-white p-4 shadow-sm" style={{borderRadius: '4px'}}>
              <h4 className="mb-4" style={{fontFamily: 'Cinzel, serif'}}>Resumen</h4>
              
              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Subtotal</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 text-muted">
                <span>Envío (Standard)</span>
                <span className="text-success">GRATIS</span>
              </div>
              
              <hr className="my-4" />
              
              <div className="d-flex justify-content-between mb-4 align-items-center">
                <span className="h6 mb-0 text-uppercase">Total</span>
                <span className="h4 mb-0 text-primary fw-bold">${total.toLocaleString('es-CL')}</span>
              </div>

              <Link to="/checkout" className="btn btn-primary w-100 py-3">
                PROCEDER AL PAGO
              </Link>
              
              <div className="mt-4 text-center">
                <small className="text-muted d-block mb-2">Aceptamos</small>
                <div className="d-flex justify-content-center gap-2 opacity-50">
                  <span>💳 Visa</span>
                  <span>💳 Master</span>
                  <span>🏦 Transferencia</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Carrito;