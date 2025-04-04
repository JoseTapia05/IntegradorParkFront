import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
    
        try {
            const response = await axios.post("http://localhost:8080/auth/forgot-password", { email });
            
            if (response.status === 200) {
                setIsSuccess(true);
                setMessage(response.data); // Usar el mensaje del backend
            }
        } catch (error) {
            setIsSuccess(false);
            if (error.response) {
                // Manejar diferentes códigos de estado
                switch(error.response.status) {
                    case 400:
                        setMessage("El correo electrónico es requerido");
                        break;
                    case 404:
                        setMessage("El correo no está registrado. Por favor regístrate primero.");
                        break;
                    default:
                        setMessage(error.response.data || "Ocurrió un error al procesar tu solicitud");
                }
            } else {
                setMessage("Error de conexión. Por favor verifica tu internet.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="forgot-password-wrapper">
            <div className="forgot-password-container">
                {!isSuccess ? (
                    <>
                        <h1 className="forgot-password-title">Recuperar Contraseña</h1>
                        <p className="forgot-password-subtitle">
                            Ingresa tu correo electrónico y te enviaremos una nueva contraseña
                        </p>

                        <form className="forgot-password-form" onSubmit={handleSubmit}>
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

                            {message && (
                                <div className={`message ${isSuccess ? "success" : "error"}`}>
                                    {message}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className="forgot-password-button"
                                disabled={isLoading}
                            >
                                {isLoading ? "Enviando..." : "Enviar Nueva Contraseña"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h1 className="forgot-password-title">¡Listo!</h1>
                        <p className="forgot-password-subtitle">{message}</p>
                        <button 
                            className="forgot-password-button"
                            onClick={() => navigate("/login")}
                        >
                            Volver al Login
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};