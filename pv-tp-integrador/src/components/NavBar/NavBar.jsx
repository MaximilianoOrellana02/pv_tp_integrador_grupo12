import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="logo-nav">
        <img src="../../public/logo.png" alt="Logo" />
      </div>
      <div className="links">
        <ul>
          <Link to={"/"}>Inicio</Link>
          <Link to={"/favorites"}>Favoritos</Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
