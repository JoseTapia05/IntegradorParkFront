import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>403 - Acceso no autorizado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <Link to="/user-dashboard" className="back-link">
        Volver al dashboard de usuario
      </Link>
    </div>
  );
};

export default Unauthorized;