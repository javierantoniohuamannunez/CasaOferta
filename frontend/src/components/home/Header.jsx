import { FaHome, FaFire, FaTag, FaStore } from "react-icons/fa";
import Buscador from "./Buscador";

const Header = ({ onBuscar }) => {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">🎮 CazaOfertas</h1>
        <Buscador onBuscar={onBuscar} />
      </div>

      <nav className="nav">
        <ul>
          <li style={{ "--clr": "#2483ff" }}>
            <a href="#">
              <FaHome />
              <span>Inicio</span>
            </a>
          </li>

          <li style={{ "--clr": "#22c55e" }}>
            <a href="#">
              <FaFire />
              <span>Destacados</span>
            </a>
          </li>

          <li style={{ "--clr": "#facc15" }}>
            <a href="#">
              <FaTag />
              <span>Ofertas</span>
            </a>
          </li>

          <li style={{ "--clr": "#f97316" }}>
            <a href="#">
              <FaStore />
              <span>Tiendas</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="header-divider"></div>
    </header>
  );
};

export default Header;