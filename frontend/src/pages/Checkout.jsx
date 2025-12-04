import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ carrito, vaciarCarrito, total }) => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    telefono: '+569',
    direccion: ''
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!datos.email.includes('@')) {
      alert('Correo inválido'); return;
    }

    // Objeto del pedido
    const orden = {
      cliente: datos,
      productos: carrito,
      total: total
    };

    try {
      // --- CONEXIÓN AL BACKEND (POST) ---
      const respuesta = await fetch('http://localhost:3000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orden)
      });

      if (respuesta.ok) {
        vaciarCarrito();
        alert('¡Compra exitosa! Tu pedido está en la nube. ☁️🌸');
        navigate('/');
      } else {
        alert('Hubo un error al procesar el pedido.');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión con el servidor.');
    }
  };

  if (carrito.length === 0) return <div className="container mt-5 text-center"><h2>Carrito vacío 🤷‍♂️</h2></div>;

  return (
    <div className="container mt-5 fade-in">
      <h2 className="mb-4 text-center">Finalizar Pedido</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label>Nombre</label>
                    <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Teléfono</label>
                    <input type="text" name="telefono" value={datos.telefono} className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Dirección</label>
                    <input type="text" name="direccion" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Confirmar Compra (${total.toLocaleString('es-CL')})</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;