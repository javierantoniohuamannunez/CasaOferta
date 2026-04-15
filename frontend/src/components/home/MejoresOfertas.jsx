// Nota (2026-04-15): este componente consumia `/games/top-ofertas` pero mapeaba el
// formato como si fuera CheapShark directo (dealID/title/thumb/savings). Ahora
// usa el formato real que devuelve tu backend.
import { useEffect, useState } from "react";
import GridJuegos from "../juegos/GridJuegos";
import { obtenerTopOfertas } from "../../services/api";

const MejoresOfertas = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;

    const cargar = async () => {
      try {
        const data = await obtenerTopOfertas();
        if (cancelado) return;

        const juegosFormateados = (Array.isArray(data) ? data : [])
          .slice(0, 12)
          .map((j) => ({
            id: j.id,
            nombre: j.nombre,
            imagen: j.imagen,
            metacritic: j.metacritic,
            precio: j.precio,
            descuento: j.descuento,
            tienda: j.tienda,
          }));

        setJuegos(juegosFormateados);
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
      <h2>Mejores Ofertas</h2>
      <GridJuegos juegos={juegos} />
    </div>
  );
};
export default MejoresOfertas;
