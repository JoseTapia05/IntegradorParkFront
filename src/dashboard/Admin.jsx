import useAuth from '../useAuth';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  
  if (!admin) return null; // O mostrar spinner
  
  return (
    <div>
      <h1>Bienvenido, {admin.email}</h1>
      <p>Tu rol es: {admin.role}</p>
      <button onClick={logout}>Cerrar sesión</button>
      {/* Resto del dashboard */}
    </div>
  );
};

export default AdminDashboard;