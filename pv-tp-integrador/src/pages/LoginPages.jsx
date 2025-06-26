// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/userSlice'; // Importamos la acción de login

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Buscar usuario por correo electrónico
      const user = existingUsers.find(u => u.email === email);

      if (user && user.password === password) { // Compara la contraseña (en una app real, usarías bcrypt o similar)
        // Credenciales válidas: Iniciar sesión
        const sessionInfo = { email: user.email, name: user.name || 'Usuario' }; // Información básica del usuario
        dispatch(loginUser(sessionInfo)); // Despacha la acción para guardar en Redux y localStorage 

        navigate('/'); // Redirigir a la Home 
        // Se mostrará el mensaje "Bienvenido" en el Nav, lo implementaremos en el siguiente paso 
      } else {
        // Credenciales inválidas
        setError('Credenciales inválidas. Verifica tu correo y contraseña.'); // 
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError('Ocurrió un error al intentar iniciar sesión.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        ¿No tienes una cuenta? <span onClick={() => navigate('/register')} style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>Regístrate aquí</span>
      </p>
    </div>
  );
};

export default LoginPage;