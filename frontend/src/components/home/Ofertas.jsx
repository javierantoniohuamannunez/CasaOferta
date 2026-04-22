import { useEffect, useState } from "react";
import { obtenerTopOfertas } from "../../services/api";

const MejoresOfertas = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;

    const cargar = async () => {
      try {
        const cache = localStorage.getItem("ofertas");
        if (cache) {
          setJuegos(JSON.parse(cache));
          setCargando(false);
          return;
        }

        const data = await obtenerTopOfertas();
        if (cancelado) return;

        const juegosFormateados = (Array.isArray(data) ? data : [])
          .slice(0, 6)
          .map((j) => ({
            id: j.id,
            nombre: j.nombre,
            imagen:
              j.imagen ||
              "https://via.placeholder.com/300x150?text=No+Image",
            metacritic: j.metacritic ?? 0,
            precio: j.precio,
            descuento: j.descuento,
            tienda: j.tienda,
          }));

        setJuegos(juegosFormateados);
        localStorage.setItem("ofertas", JSON.stringify(juegosFormateados));

        setError(null);
      } catch (err) {
        console.log("Error:", err);
        if (!cancelado) setError("No se pudieron cargar las ofertas.");
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    cargar();

    return () => {
      cancelado = true;
    };
  }, []);

  if (cargando) return <p>Cargando ofertas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mejores-ofertas">
      <h2 className="titulo-seccion">Mejores Ofertas</h2>

      <div className="grid-juegos">
        {juegos.map((juego) => (
          <div key={juego.id} className="hero-card">
            <img src={juego.imagen} alt={juego.nombre} />
            <h2>{juego.nombre}</h2>

            {juego.metacritic > 0 && (
              <p className="metacritic">{juego.metacritic}</p>
            )}

            <div className="precio">
              {juego.descuento && (
                <span className="descuento">
                  -{Math.round(juego.descuento)}%
                </span>
              )}
              <span className="precio-final">
                {juego.precio}€
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MejoresOfertas;