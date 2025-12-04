import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para redirigir

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulación de credenciales (Igual que en tu versión anterior)
    if (email === 'admin@admin.cl' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      alert('¡Bienvenido Administrador!');
      navigate('/admin'); // Redirige al panel
    } else {
      alert('Credenciales incorrectas (Prueba: admin@admin.cl / admin123)');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <div className="card shadow">
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Acceso Admin 🔐</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input 
                type="email" 
                className="form-control" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;