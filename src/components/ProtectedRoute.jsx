import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Función para extraer el rol del token JWT
const getUserRoleFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.role || 'user'; // Asume 'user' como rol por defecto
  } catch (error) {
    console.log(error)
    return null;
  }
};

const ProtectedRoute = ({ children, requiredRoles }) => {
  const token = localStorage.getItem('jwtToken');
  
  // Si no hay token, redirigir a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  const userRole = getUserRoleFromToken(token);
  
  // Si no se pudo decodificar el token o no tiene rol
  if (!userRole) {
    localStorage.removeItem('jwtToken');
    return <Navigate to="/login" replace />;
  }
  
  // Verificar si el rol del usuario está autorizado
  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

export default ProtectedRoute;