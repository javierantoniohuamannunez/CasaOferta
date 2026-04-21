import { obtenerNombreTienda } from "../../utils/tiendas";
import { FaWindows, FaPlaystation, FaXbox, FaLinux } from "react-icons/fa";

const TarjetaJuego = ({ juego }) => {
  const getIcono = (plataforma) => {
    if (plataforma.includes("PC")) return <FaWindows />;
    if (plataforma.includes("PlayStation")) return <FaPlaystation />;
    if (plataforma.includes("Xbox")) return <FaXbox />;
    if (plataforma.includes("Linux")) return <FaLinux />;
    return null;
  };

  return (
    <div className="hero-card">
      <img src={juego.imagen} alt={juego.nombre} />

      <h2>{juego.nombre}</h2>

      {juego.metacritic > 0 && (
        <p
          className={`metacritic ${
            juego.metacritic > 85
              ? "alto"
              : juego.metacritic >= 70
                ? "medio"
                : "bajo"
          }`}
        >
          {juego.metacritic}
        </p>
      )}

      <div className="plataformas">
        {juego.plataformas?.map((p, i) => {
          const icono = getIcono(p);
          if (!icono) return null;
          return <span key={i}>{icono}</span>;
        })}
      </div>

      {juego.precio != null && (
        <div className="precio">
          {juego.descuento && (
            <span className="descuento">-{Math.round(juego.descuento)}%</span>
          )}
          <span className="precio-final">
            {juego.precio ? `${juego.precio}€` : "Sin oferta"}
          </span>
        </div>
      )}

      {juego.tienda && (
        <span className="tienda">{obtenerNombreTienda(juego.tienda)}</span>
      )}
    </div>
  );
};

export default TarjetaJuego;
