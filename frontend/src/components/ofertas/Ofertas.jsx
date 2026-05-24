import "./ofertas.css";
import { useEffect, useState } from "react";
import { obtenerTiendas } from "../../services/api";
import { useNavigate } from "react-router-dom";

const MejoresOfertas = () => {
  const [tiendas, setTiendas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerTiendas();

        if (!Array.isArray(data)) {
          throw new Error("Respuesta inválida");
        }

        setTiendas(data);
      } catch (err) {
        console.log(err);
        setError("Error cargando ofertas");
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  if (cargando) {
    return <p style={{ padding: 20 }}>Cargando...</p>;
  }

  if (error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }

  if (tiendas.length === 0) {
    return <p style={{ padding: 20 }}>No hay ofertas disponibles</p>;
  }

  return (
    <section className="mejores-ofertas" id="ofertas">
      <div className="ofertas-header">
        <h2 className="titulo-seccion">Ofertas destacadas</h2>
        <p className="ofertas-subtitle">
          Los mejores descuentos encontrados entre Steam, Humble, Fanatical, GOG
          y más tiendas.
        </p>
      </div>

      <div className="tiendas-grid">
        {tiendas.map((tienda) => (
          <div
            key={tienda.tiendaId}
            className="tienda-card"
            onClick={() => navigate(`/tienda/${tienda.tiendaId}`)}
          >
            <div className="tienda-top">
              <h3 className="tienda-nombre">{tienda.tienda}</h3>
              <span className="tienda-total">
                {tienda.juegos.length} ofertas
              </span>
            </div>

            {tienda.juegos.length === 0 ? (
              <p className="sin-ofertas">No hay ofertas disponibles</p>
            ) : (
              tienda.juegos.map((juego) => (
                <div
                  key={`${tienda.tiendaId}-${juego.id}`}
                  className="oferta-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/oferta/${tienda.tiendaId}/${juego.id}`);
                  }}
                >
                  <div className="oferta-img">
                    <img src={juego.imagen} alt={juego.nombre} />
                    <div className="descuento-floating">
                      -{juego.descuento}%
                    </div>
                  </div>

                  <div className="oferta-info">
                    <p className="nombre">{juego.nombre}</p>

                    <div className="extra-info">
                      {juego.metacritic > 0 && (
                        <span
                          className={`metacritic ${
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
                    </div>

                    <div className="precios">
                      <span className="precio-original">
                        €{juego.precioNormal.toFixed(2)}
                      </span>
                      <span className="precio-oferta">
                        €{juego.precioActual.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MejoresOfertas;
