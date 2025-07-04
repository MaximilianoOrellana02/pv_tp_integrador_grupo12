import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/userSlice';

import "./NavBar.css";

const NavBar = () => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para menú

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
    setMenuOpen(false); // Cerrar menú al desloguear
  };

  const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle abrir/cerrar

  return (
    <nav className="nav-bar">
     

      {/* Botón hamburguesa solo visible en mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"}
      </div>

      {/* Contenedor de links visible solo si está abierto en mobile o siempre en desktop */}
      <div className={`links ${menuOpen ? "active" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
          <li><Link to="/favorites" onClick={() => setMenuOpen(false)}>Favoritos</Link></li>
          {!isAuthenticated && (
            <>
              <li><Link to="/register" onClick={() => setMenuOpen(false)}>Registrarse</Link></li>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Iniciar Sesión</Link></li>
            </>
          )}
        </ul>
      </div>

      {isAuthenticated && currentUser && (
        <div className="user-info">
          <span>Bienvenido, {currentUser.name || currentUser.email}</span>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
