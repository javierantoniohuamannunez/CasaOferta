import "./header.css";
import Buscador from "./Buscador";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Notificaciones from "../notificaciones/Notificaciones";

const Header = ({ onBuscar }) => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo-link">
          <img src={logo} alt="CazaOfertas" className="logo-img" />
        </Link>

        <div className="header-search">
          <Buscador onBuscar={onBuscar} />
        </div>

        <div className="header-user">
          {token ? (
            <>
              <Notificaciones />

              <Link to="/perfil" className="perfil-link">
                Perfil
              </Link>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn login-btn">
                Login
              </Link>

              <Link to="/register" className="auth-btn register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="nav">
        <a href="#">Inicio</a>

        <a href="#destacados">Top Juegos</a>

        <a href="#ofertas">Ofertas</a>

        <a href="#categorias">Categorías</a>

        <a href="#tiendas">Tiendas</a>
      </nav>
    </header>
  );
};

export default Header;
