import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import {Login} from './components/Login';
import UserDashboard from './dashboard/User';
import AdminDashboard from './dashboard/Admin';
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Ruta protegida para usuarios normales */}
        <Route path="/user-dashboard" element={
          <ProtectedRoute requiredRoles={['USER']}>
            <UserDashboard />
          </ProtectedRoute>
        } />
        
        {/* Ruta protegida para administradores */}
        <Route path="/admin-dashboard" element={
          <ProtectedRoute requiredRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
      </Routes>
    </Router>
  );
}

export default App;