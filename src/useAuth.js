import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const login = (token) => {
    localStorage.setItem('jwtToken', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };
  
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    navigate('/login');
  };
  
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        
        // Verificar expiración
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        }
      } catch (error) {
        console.log(error)
        logout();
      }
    }
  }, []);
  
  return { user, login, logout };
};

export default useAuth;