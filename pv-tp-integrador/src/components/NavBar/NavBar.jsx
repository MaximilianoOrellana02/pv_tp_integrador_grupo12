// src/components/NavBar/NavBar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/userSlice';

import "./NavBar.css"; // Tu archivo CSS

const NavBar = () => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <div className="links">
        <ul>
          <li>
            <Link to={"/"}>Inicio</Link>
          </li>
          <li>
            <Link to={"/favorites"}>Favoritos</Link>
          </li>
          {!isAuthenticated && (
            <>
              <li>
                <Link to={"/register"}>Registrarse</Link>
              </li>
              <li>
                <Link to={"/login"}>Iniciar Sesión</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="logo-nav">
        <img src="/logo.png" alt="Logo" />
      </div>

      {isAuthenticated && currentUser && (
        // Usamos la nueva clase CSS 'user-info' aquí
        <div className="user-info">
          <span>
            Bienvenido, {currentUser.name || currentUser.email}
          </span>
          <button onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;