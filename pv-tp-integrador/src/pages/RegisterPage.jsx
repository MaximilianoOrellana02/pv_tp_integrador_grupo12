import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./RegisterPage.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones en el front-end
    if (!email || !password || !confirmPassword) {
      setError("Todos los campos obligatorios deben ser completados.");
      return;
    }

    // Correo con formato válido (validación básica)
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("El formato del correo electrónico no es válido.");
      return;
    }

    // Contraseña >= 6 caracteres
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Contraseña y confirmación deben coincidir
    if (password !== confirmPassword) {
      setError("La contraseña y la confirmación no coinciden.");
      return;
    }

    try {
      // Obtener usuarios existentes de localStorage o inicializar un array vacío
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Verificar si el correo ya está registrado
      if (existingUsers.some((user) => user.email === email)) {
        setError("Este correo electrónico ya está registrado.");
        return;
      }

      // Crear el nuevo usuario
      const newUser = {
        email,
        password, // En una aplicación real, la contraseña NUNCA se guardaría en texto plano. Se usaría hashing (ej. bcrypt) en el backend.
        name, // Guardamos el campo extra
      };

      // Guardar el nuevo usuario en localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); //

      setSuccess("Registro exitoso. Serás redirigido al login."); //
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");

      // Redirigir automáticamente a la ruta "Login" después de un breve retardo
      setTimeout(() => {
        navigate("/login"); //
      }, 1500); // Redirige después de 1.5 segundos
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      setError("Error al registrar usuario. Intente de nuevo.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Registro de Usuario</h2>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <div>
            <label htmlFor="name">Nombre (Opcional):</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          <button type="submit" className="register-button">
            Registrarse
          </button>
        </form>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => navigate("/login")}>Inicia sesión aquí</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
