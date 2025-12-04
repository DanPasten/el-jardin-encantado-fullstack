import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navigation from './components/Navigation';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import './App.css';

function App() {
  // --- ESTADO 1: CARRITO (Este sí lo mantenemos local por comodidad del usuario) ---
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // --- ESTADO 2: PRODUCTOS (CONECTADO AL BACKEND) ---
  const [misProductos, setMisProductos] = useState([]);

  // 1. CARGAR PRODUCTOS DESDE EL SERVIDOR (GET)
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      const datos = await respuesta.json();
      setMisProductos(datos); // Guardamos lo que nos dio el servidor
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  // --- FUNCIONES DEL CARRITO ---
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };
  const eliminarDelCarrito = (index) => {
    const nuevo = [...carrito];
    nuevo.splice(index, 1);
    setCarrito(nuevo);
  };
  const vaciarCarrito = () => setCarrito([]);
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);


  // --- FUNCIONES DE PRODUCTOS (CONECTADAS AL BACKEND) ---

  // 2. AGREGAR PRODUCTO AL SERVIDOR (POST)
  const agregarProducto = async (nuevoProducto) => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });
      
      if (respuesta.ok) {
        // Si se guardó bien, recargamos la lista desde el servidor
        obtenerProductos(); 
      }
    } catch (error) {
      alert("Error al guardar en el servidor");
    }
  };

  // 3. ELIMINAR PRODUCTO DEL SERVIDOR (DELETE)
  const eliminarProducto = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: 'DELETE'
      });
      // Actualizamos la lista visualmente quitando el eliminado
      setMisProductos(misProductos.filter(p => p.id !== id));
    } catch (error) {
      alert("Error al eliminar del servidor");
    }
  };

  return (
    <BrowserRouter>
      <Navigation cantidadCarrito={carrito.length} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        
        <Route 
          path="/tienda" 
          element={<Tienda productos={misProductos} agregarAlCarrito={agregarAlCarrito} />} 
        />
        
        <Route 
          path="/carrito" 
          element={<Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} vaciarCarrito={vaciarCarrito} total={total} />} 
        />

        <Route 
          path="/checkout" 
          element={
            <Checkout 
              carrito={carrito} 
              vaciarCarrito={vaciarCarrito} 
              total={total} 
            />
          } 
        />

        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <Admin 
              listaProductos={misProductos} 
              agregarProducto={agregarProducto} 
              eliminarProducto={eliminarProducto} 
            />
          } 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;