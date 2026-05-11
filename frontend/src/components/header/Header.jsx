import "./header.css";

import Buscador from "./Buscador";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

const Header = ({ onBuscar }) => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo-link">
          <img
            src={logo}
            alt="CazaOfertas"
            className="logo-img"
          />
        </Link>

        <div className="header-search">
          <Buscador onBuscar={onBuscar} />
        </div>

        <div className="header-user">
          {token ? (
            <>
              <Link to="/perfil" className="perfil-link">
                Perfil
              </Link>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn login-btn">
                Login
              </Link>

              <Link
                to="/register"
                className="auth-btn register-btn"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="nav">
        <a href="#">Inicio</a>
        <a href="../destacados">Destacados</a>
        <a href="#ofertas">Ofertas</a>
        <a href="#tiendas">Tiendas</a>
      </nav>
    </header>
  );
};

export default Header;