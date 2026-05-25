import "./tienda.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerTiendaPorId } from "../../services/api";

const Tienda = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tienda, setTienda] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerTiendaPorId(id);

        setTienda(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [id]);

  if (loading) {
    return <p style={{ padding: 20 }}>Cargando...</p>;
  }

  if (!tienda) {
    return <p style={{ padding: 20 }}>Tienda no encontrada</p>;
  }

  return (
    <div className="pagina-tienda">
      <h1 className="titulo-tienda">{tienda.tienda}</h1>

      <div className="grid-juegos">
        {tienda.juegos.map((juego) => (
          <div
            key={juego.id}
            className="card-juego"
            onClick={() =>
              navigate(
                `/oferta/${tienda.tiendaId}/${juego.juegoId || juego.id}`,
              )
            }
          >
            <img src={juego.imagen} alt={juego.nombre} />

            <div className="contenido-card">
              <h3>{juego.nombre}</h3>

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

              <div className="precios">
                <span className="old">
                  €{Number(juego.precioNormal).toFixed(2)}
                </span>

                <span className="new">
                  €{Number(juego.precioActual).toFixed(2)}
                </span>

                <span className="discount">-{juego.descuento}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tienda;
