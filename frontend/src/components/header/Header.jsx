import "./header.css";
import Buscador from "./Buscador";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Notificaciones from "../notificaciones/Notificaciones";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const irAInicio = () => {
    navigate("/");

    if (location.pathname === "/" && !location.search) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const irASeccion = (sectionId) => {
    navigate(`/#${sectionId}`);
  };

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo-link">
          <img src={logo} alt="CazaOfertas" className="logo-img" />
        </Link>

        <div className="header-search">
          <Buscador />
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
        <button type="button" className="nav-link" onClick={irAInicio}>
          Inicio
        </button>

        <button
          type="button"
          className="nav-link"
          onClick={() => irASeccion("destacados")}
        >
          Top Juegos
        </button>

        <button
          type="button"
          className="nav-link"
          onClick={() => irASeccion("ofertas")}
        >
          Ofertas
        </button>

        <button
          type="button"
          className="nav-link"
          onClick={() => irASeccion("categorias")}
        >
          Categorias
        </button>

        <button
          type="button"
          className="nav-link"
          onClick={() => irASeccion("tiendas")}
        >
          Tiendas
        </button>
      </nav>
    </header>
  );
};

export default Header;
