import { obtenerNombreTienda } from "../../utils/tiendas";

const TarjetaJuego = ({ juego }) => {
  return (
    <div className="card">
      <img src="{juego.imagen}" alt="{juego.nombre}" />
      <div className="card-content">
        <h4>{juego.nombre}</h4>

        {juego.metacritic && (
          <span className="metacritic">{juego.metacritic}</span>
        )}
        {juego.precio && (
          <div className="precio">
            {juego.descuento && (
              <span className="descuento"> -{Math.round(juego.descuento)}%</span>
            )}
            <span className="precio-final">{juego.precio}$</span>
          </div>
        )}
        {juego.tienda && (
            <span className="tienda">
                {obtenerNombreTienda(juego.tienda)}
            </span>
        )}
      </div>
    </div>
  );
};
export default TarjetaJuego;