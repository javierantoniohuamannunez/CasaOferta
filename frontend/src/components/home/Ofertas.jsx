import { useEffect, useState } from "react";
import { obtenerTopOfertas } from "../../services/api";
import { obtenerNombreTienda } from "../../utils/tiendas";

const MejoresOfertas = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerTopOfertas();

        if (!Array.isArray(data)) {
          throw new Error("Respuesta inválida");
        }

        setJuegos(data);
      } catch (err) {
        console.log(err);
        setError("Error cargando ofertas");
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  const agruparPorTienda = (juegos) => {
    const tiendasValidas = ["1", "11", "2"];
    const resultado = {};

    juegos.forEach((juego) => {
      if (!tiendasValidas.includes(juego.tienda)) return;

      if (!resultado[juego.tienda]) {
        resultado[juego.tienda] = [];
      }

      if (resultado[juego.tienda].length < 2) {
        resultado[juego.tienda].push(juego);
      }
    });

    return Object.entries(resultado);
  };

  if (cargando) {
    return <p style={{ padding: 20 }}>Cargando...</p>;
  }

  if (error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }

  const tiendasAgrupadas = agruparPorTienda(juegos);

  if (tiendasAgrupadas.length === 0) {
    return <p style={{ padding: 20 }}>No hay ofertas disponibles</p>;
  }

  return (
    <div className="mejores-ofertas">
      <h2 className="titulo-seccion">Mejores Ofertas</h2>

      <div className="tiendas-grid">
        {tiendasAgrupadas.map(([tiendaId, juegosTienda]) => (
          <div key={tiendaId} className="tienda-card">
            <h3 className="tienda-nombre">{obtenerNombreTienda(tiendaId)}</h3>

            {juegosTienda.map((juego) => (
              <div key={juego.id} className="oferta-item">
                <img src={juego.imagen} alt={juego.nombre} />

                <div className="oferta-info">
                  <p className="nombre">{juego.nombre}</p>

                  <div className="extra-info">
                    {juego.metacritic > 0 && (
                      <span
                        className={`metacritic small ${
                          juego.metacritic > 85
                            ? "alto"
                            : juego.metacritic >= 70
                              ? "medio"
                              : "bajo"
                        }`}
                      >
                        {juego.metacritic}
                      </span>
                    )}

                    {juego.rating && (
                      <span className="steam-rating">
                        Metacritic: {juego.rating}%
                      </span>
                    )}
                  </div>

                  <div className="precios">
                    <span className="precio">
                      {Number(juego.precio).toFixed(2)}€
                    </span>

                    {juego.descuento && (
                      <span className="descuento">
                        -{Math.round(juego.descuento)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MejoresOfertas;
