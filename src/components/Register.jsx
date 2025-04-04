import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/register", {
                username,
                email,
                password,
                role: "USER" // Rol por defecto
            });

            if (response.status === 200) {
                // Redirigir al login después del registro exitoso
                navigate('/login', { state: { registrationSuccess: true } });
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrar el usuario");
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-container">
                <h1 className="register-title">Crear Cuenta</h1>
                <p className="register-subtitle">Completa el formulario para registrarte</p>
                
                {error && <div className="error-message">{error}</div>}
                
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            id="username"
                            type="text"
                            className="input-field"
                            placeholder="ej. usuario123"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <p className="input-hint">Este será tu nombre para iniciar sesión</p>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            className="input-field"
                            placeholder="ej. tu@email.com"
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
                            minLength="6"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="input-field"
                            placeholder="······"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="register-button">
                        Registrarse
                    </button>
                </form>

                <div className="login-link">
                    ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
                </div>
            </div>
        </div>
    );
};