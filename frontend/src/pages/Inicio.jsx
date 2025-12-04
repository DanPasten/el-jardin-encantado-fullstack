import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="fade-in">
      
      {/* 1. HERO SECTION CINEMATOGRÁFICO */}
      <header className="position-relative w-100 vh-100 d-flex align-items-center justify-content-center overflow-hidden" style={{marginTop: '-80px'}}>
        {/* Imagen de fondo oscurecida */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'url("https://previews.123rf.com/images/photoroman/photoroman1705/photoroman170500038/78607334-colorful-tulips-in-spring-keukenhof-netherlands-europe-blooming-tulip-keukenhof-garden.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)', // Oscurece la imagen para que el texto resalte
          zIndex: -1
        }}></div>

        <div className="text-center text-white px-3">
          <p className="text-uppercase letter-spacing-2 mb-3" style={{letterSpacing: '3px'}}>Bienvenido a</p>
          <h1 className="display-1 fw-bold mb-4">El Jardín Encantado</h1>
          <p className="lead mb-5" style={{maxWidth: '600px', margin: '0 auto', opacity: 0.9}}>
            Donde la botánica se encuentra con el arte. Creamos arreglos florales que cuentan historias y perduran en la memoria.
          </p>
          <Link to="/tienda" className="btn btn-primary btn-lg px-5 py-3">Explorar Colección</Link>
        </div>
      </header>

      {/* 2. SECCIÓN "NUESTRA ESENCIA" */}
      <section className="container my-5 py-5">
        <div className="row text-center mb-5">
          <div className="col-lg-8 mx-auto">
            <h2 className="mb-3" style={{color: 'var(--color-primary)'}}>La Esencia Floral</h2>
            <p className="text-muted">Cultivamos belleza para tus momentos más importantes.</p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-5 text-center bg-white shadow-sm h-100" style={{borderTop: '3px solid var(--color-accent)'}}>
              <div className="display-4 mb-3" style={{color: 'var(--color-primary)'}}>🌿</div>
              <h4>Frescura</h4>
              <p className="text-muted small">Flores cortadas al amanecer, asegurando la máxima duración y vitalidad en tu hogar.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-5 text-center bg-white shadow-sm h-100" style={{borderTop: '3px solid var(--color-primary)'}}>
              <div className="display-4 mb-3" style={{color: 'var(--color-primary)'}}>🎨</div>
              <h4>Diseño de Autor</h4>
              <p className="text-muted small">Cada ramo es una pieza única, diseñada por floristas expertos con pasión por el detalle.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-5 text-center bg-white shadow-sm h-100" style={{borderTop: '3px solid var(--color-accent)'}}>
              <div className="display-4 mb-3" style={{color: 'var(--color-primary)'}}>🚚</div>
              <h4>Entrega Premium</h4>
              <p className="text-muted small">Transporte especializado para que tus flores lleguen tan perfectas como salieron del taller.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BANNER PROMOCIONAL INTERMEDIO */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img 
                src="https://images.unsplash.com/photo-1563241527-300027ba38f8?auto=format&fit=crop&q=80&w=1000" 
                alt="Florista trabajando" 
                className="img-fluid shadow"
                style={{borderRadius: '4px'}}
              />
            </div>
            <div className="col-md-6 ps-md-5">
              <h2 className="mb-4">Suscripción Floral</h2>
              <p className="mb-4 text-muted">
                ¿Te imaginas tener flores frescas en tu casa todas las semanas? Únete a nuestro club de suscripción y recibe la temporada en tu puerta.
              </p>
              <button className="btn btn-outline-primary" onClick={() => alert('Próximamente')}>Más Información</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Inicio;