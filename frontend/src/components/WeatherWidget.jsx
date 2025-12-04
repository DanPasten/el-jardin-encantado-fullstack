import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [clima, setClima] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  // API KEY DE PRUEBA (Si esta falla, regístrate en openweathermap.org para obtener una propia)
  const API_KEY = 'e932c96c565a4e51130767072557650f'; 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          obtenerClima(lat, lon);
        },
        (err) => {
          // Si el usuario deniega el permiso, no es un error crítico, solo mostramos el aviso
          setError("Ubicación denegada");
          setCargando(false);
        }
      );
    } else {
      setError("Sin GPS");
      setCargando(false);
    }
  }, []);

  const obtenerClima = async (lat, lon) => {
    try {
      const respuesta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
      );
      
      const datos = await respuesta.json();

      // VALIDACIÓN IMPORTANTE: Si la API devuelve un código de error (ej: 401, 404)
      if (datos.cod !== 200) {
        setError("Clima no disponible");
      } else {
        setClima(datos);
      }
    } catch (error) {
      console.error("Error técnico al cargar clima:", error);
      setError("Error conexión");
    } finally {
      setCargando(false);
    }
  };

  // --- RENDERIZADO SEGURO ---

  // 1. Si hay error, mostramos un texto pequeño o nada (para no romper la estética)
  if (error) {
    return (
        <div className="d-flex align-items-center ms-3 px-2 py-1 bg-light rounded-pill border" title="No se pudo cargar el clima">
            <span style={{fontSize: '1rem'}}>🌍</span>
            <span className="text-muted ms-1" style={{fontSize: '0.7rem'}}>N/A</span>
        </div>
    );
  }

  // 2. Mientras carga
  if (cargando) {
    return <span className="text-muted small ms-3" style={{fontSize: '0.8rem'}}>...</span>;
  }

  // 3. Si tenemos datos, los mostramos CON SEGURIDAD (usando ?.)
  // El ?. evita que la pantalla se ponga blanca si falta algún dato
  return (
    <div className="d-flex align-items-center ms-3 px-3 py-1 bg-light rounded-pill border" style={{fontSize: '0.85rem'}}>
      {clima?.weather?.[0]?.icon && (
          <img 
            src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}.png`} 
            alt="Icono clima" 
            style={{width: '30px', height: '30px'}} 
          />
      )}
      
      <div className="d-flex flex-column ms-1" style={{lineHeight: '1.2'}}>
        <span className="fw-bold text-dark">
            {clima?.main?.temp ? Math.round(clima.main.temp) : '--'}°C
        </span>
        <span className="text-muted small text-capitalize">
            {clima?.name || 'Tu ubicación'}
        </span>
      </div>
    </div>
  );
};

export default WeatherWidget;