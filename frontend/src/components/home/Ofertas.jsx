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
    const tiendas = {};

    juegos.forEach((juego) => {
      if (!tiendasValidas.includes(juego.tienda)) return;

      if (!tiendas[juego.tienda]) {
        tiendas[juego.tienda] = [];
      }

      if (tiendas[juego.tienda].length < 2) {
        tiendas[juego.tienda].push(juego);
      }
    });

    return Object.entries(tiendas);
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

                  <div className="precios">
                    <span className="precio">{juego.precio}€</span>

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
