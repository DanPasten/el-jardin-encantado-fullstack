import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = ({ listaProductos, agregarProducto, eliminarProducto }) => {
  const navigate = useNavigate();
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState('');
  const [listaPedidos, setListaPedidos] = useState([]); // Estado para pedidos

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') navigate('/login');
    
    cargarPedidos(); // Cargar al iniciar
  }, [navigate]);

  // --- FUNCIÓN PARA CARGAR PEDIDOS DESDE API ---
  const cargarPedidos = async () => {
    try {
      const resp = await fetch('http://localhost:3000/api/pedidos');
      const data = await resp.json();
      setListaPedidos(data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    }
  };

  // --- FUNCIÓN PARA ELIMINAR PEDIDO EN API ---
  const completarPedido = async (id) => {
    if (window.confirm('¿Marcar pedido como completado?')) {
        await fetch(`http://localhost:3000/api/pedidos/${id}`, { method: 'DELETE' });
        cargarPedidos(); // Recargar la lista
    }
  };

  // Manejo del formulario de productos (igual que antes)
  const handleSubmit = (e) => {
    e.preventDefault();
    agregarProducto({
      nombre: nuevoNombre,
      precio: Number(nuevoPrecio),
      imagen: nuevaImagen || "https://via.placeholder.com/300",
      categoria: "General"
    });
    setNuevoNombre(''); setNuevoPrecio(''); setNuevaImagen('');
    alert('Producto guardado en la nube');
  };

  return (
    <div className="container mt-4 mb-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración 🛠️</h2>
        <button className="btn btn-outline-danger" onClick={() => { localStorage.removeItem('userRole'); navigate('/login'); }}>Salir</button>
      </div>

      {/* GESTIÓN DE PRODUCTOS */}
      <div className="row mb-5">
        <div className="col-md-4">
            <div className="card p-3 shadow-sm">
                <h5>Nuevo Producto</h5>
                <form onSubmit={handleSubmit}>
                    <input className="form-control mb-2" placeholder="Nombre" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} required />
                    <input className="form-control mb-2" type="number" placeholder="Precio" value={nuevoPrecio} onChange={e => setNuevoPrecio(e.target.value)} required />
                    <input className="form-control mb-2" placeholder="URL Imagen" value={nuevaImagen} onChange={e => setNuevaImagen(e.target.value)} />
                    <button className="btn btn-success w-100">Guardar</button>
                </form>
            </div>
        </div>
        <div className="col-md-8">
            <div className="table-responsive" style={{maxHeight: '300px'}}>
                <table className="table table-bordered">
                    <thead className="table-dark"><tr><th>Nombre</th><th>Precio</th><th>Acción</th></tr></thead>
                    <tbody>
                        {listaProductos.map(p => (
                            <tr key={p.id}>
                                <td>{p.nombre}</td>
                                <td>${p.precio}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(p.id)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* GESTIÓN DE PEDIDOS (CONECTADO A FIREBASE) */}
      <h4 className="border-bottom pb-2 mb-3">📦 Pedidos en la Nube</h4>
      {listaPedidos.length === 0 ? <div className="alert alert-info">No hay pedidos pendientes.</div> : 
        <div className="table-responsive">
            <table className="table table-hover border bg-white">
                <thead className="bg-primary text-white">
                    <tr><th>Fecha</th><th>Cliente</th><th>Total</th><th>Acción</th></tr>
                </thead>
                <tbody>
                    {listaPedidos.map(p => (
                        <tr key={p.id}>
                            <td>{p.fecha}</td>
                            <td>{p.cliente.nombre}<br/><small>{p.cliente.email}</small></td>
                            <td className="fw-bold">${p.total}</td>
                            <td><button className="btn btn-outline-success btn-sm" onClick={() => completarPedido(p.id)}>✅ Listo</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      }
    </div>
  );
};

export default Admin;