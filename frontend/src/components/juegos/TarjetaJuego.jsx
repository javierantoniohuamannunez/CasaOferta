import { obtenerNombreTienda } from "../../utils/tiendas";

const TarjetaJuego = ({ juego }) => {
  // Nota (2026-04-15): arreglado `src`/`alt` del `<img>`; antes estaban como string
  // literal y no renderizaban la imagen ni el texto alternativo correctamente.
  return (
    <div className="card">
      <img src={juego.imagen} alt={juego.nombre} />
      <div className="card-content">
        <h4>{juego.nombre}</h4>

        {juego.metacritic && (
          <span className="metacritic">{juego.metacritic}</span>
        )}
        {juego.precio != null && (
          <div className="precio">
            {juego.descuento ? (
              <span className="descuento">-{Math.round(juego.descuento)}%</span>
            ) : (
              <span />
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
    </div>
  );
};
export default TarjetaJuego;
