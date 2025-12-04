import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          
          {/* Columna 1: Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">El Jardín Encantado 🌿</h5>
            <p>
              Llevamos la naturaleza a tu puerta. Arreglos florales con amor y dedicación para tus momentos más especiales.
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Enlaces</h5>
            <p><a href="/" className="text-white" style={{textDecoration: 'none'}}>Inicio</a></p>
            <p><a href="/tienda" className="text-white" style={{textDecoration: 'none'}}>Tienda</a></p>
            <p><a href="/admin" className="text-white" style={{textDecoration: 'none'}}>Admin</a></p>
          </div>

          {/* Columna 3: Contacto */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contacto</h5>
            <p><i className="fas fa-home mr-3"></i> Santiago, Chile</p>
            <p><i className="fas fa-envelope mr-3"></i> contacto@jardin.cl</p>
            <p><i className="fas fa-phone mr-3"></i> +56 9 1234 5678</p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p>© 2025 <strong>El Jardín Encantado</strong>. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;