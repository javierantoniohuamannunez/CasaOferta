import Buscador from "./Buscador";

const Header = ({ onBuscar }) => {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">CazaOfertas</h1>
        <Buscador onBuscar={onBuscar} />
      </div>

      <nav className="nav">
        <a href="#">Inicio</a>
        <a href="#">Destacados</a>
        <a href="#">Ofertas</a>
        <a href="#">Tiendas</a>
      </nav>
    </header>
  );
};

export default Header;