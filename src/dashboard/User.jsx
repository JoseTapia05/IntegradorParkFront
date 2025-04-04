import useAuth from '../useAuth';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  
  if (!user) return null; // O mostrar spinner
  
  return (
    <div>
      <h1>Bienvenido, {user.email}</h1>
      <p>Tu rol es: {user.role}</p>
      <button onClick={logout}>Cerrar sesión</button>
      {/* Resto del dashboard */}
    </div>
  );
};

export default UserDashboard;