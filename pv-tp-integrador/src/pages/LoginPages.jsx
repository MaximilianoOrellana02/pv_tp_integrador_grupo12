import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/userSlice";

import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Buscar usuario por correo electrónico
      const user = existingUsers.find((u) => u.email === email);

      if (user && user.password === password) {
        const sessionInfo = { email: user.email, name: user.name || "Usuario" }; // Información básica del usuario
        dispatch(loginUser(sessionInfo)); // Despacha la acción para guardar en Redux y localStorage

        navigate("/"); // Redirigir a la Home
      } else {
        setError("Credenciales inválidas. Verifica tu correo y contraseña."); //
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i class="fa-solid fa-eye"></i>
                ) : (
                  <i class="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
          ¿No tienes una cuenta?{" "}
          <span onClick={() => navigate("/register")}>Regístrate aquí</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
