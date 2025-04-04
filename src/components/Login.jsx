import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const clientId = "909300115830-dl7o3cj0sn59ia8r019457j7asm64od0.apps.googleusercontent.com";
    const navigate = useNavigate();

    const handleCredentialsSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const credentials = { username: email, password };
            const response = await axios.post("http://localhost:8080/auth/login", credentials);
            
            const { token, user } = response.data;
            
            // 1. Almacena el token
            localStorage.setItem('jwtToken', token);
            
            // 2. Redirige según el rol (misma lógica que Google)
            if (user?.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (user?.role === 'OWNER') {
                navigate('/owner-dashboard');
            } else {
                navigate('/user-dashboard'); // Redirección por defecto para USER
            }
            
        } catch (error) {
            console.error("Error en autenticación:", error);
            // Opcional: Mostrar notificación al usuario
            alert("Credenciales incorrectas o error en el servidor");
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
          const response = await axios.post("http://localhost:8080/auth/google-login", {
            idToken: credentialResponse.credential
          });
          
          const { token, user } = response.data;
          
          // 1. Almacena el token
          localStorage.setItem('jwtToken', token);
          
          // 2. Redirige según el rol
          if (user?.role === 'ADMIN') {
            navigate('/admin-dashboard');
          } else {
            navigate('/user-dashboard'); // Redirección por defecto para usuarios
          }
          
        } catch (error) {
          console.error("Error en autenticación Google:", error);
          // Opcional: Mostrar notificación al usuario
        }
      };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="login-wrapper">
                <div className="login-container">
                    <h1 className="login-title">Iniciar Sesión</h1>
                    <p className="login-subtitle">Ingresa tus credenciales para acceder</p>
                    
                    <form className="login-form" onSubmit={handleCredentialsSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Usuario / Email</label>
                            <input
                                id="email"
                                type="text"
                                className="input-field"
                                placeholder="lu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                className="input-field"
                                placeholder="······"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <a href="/forgot-password" className="forgot-password">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <button type="submit" className="login-button">
                            Iniciar Sesión
                        </button>
                    </form>

                    <div className="social-divider">
                        <span>O</span>
                    </div>

                    <div className="social-login">
                        <p className="social-title">CONTINÚA CON</p>
                        <div className="google-button-container">
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => console.log("Error al iniciar sesión con Google")}
                                useOneTap
                                theme="filled_blue"
                                size="large"
                                text="continue_with"
                                shape="rectangular"
                                width="350"
                            />
                        </div>
                    </div>

                    <div className="register-link">
                        ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};