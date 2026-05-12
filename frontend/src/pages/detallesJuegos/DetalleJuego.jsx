import "./detallejuego.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerJuegoPorId } from "../../services/api";

import { FaHeart } from "react-icons/fa";

const DetalleJuego = () => {
  const { id } = useParams();

  const [juego, setJuego] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerJuegoPorId(id);
      setJuego(data);
    };

    cargar();
  }, [id]);

  if (!juego) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="detalle-container">
      <div className="detalle-background">
        <img src={juego.imagen} alt={juego.nombre} />
      </div>

      <div className="detalle-overlay"></div>

      <div className="detalle-content">
        <div className="detalle-banner">
          <img src={juego.imagen} alt={juego.nombre} className="detalle-img" />

          <button className="detalle-favorito">
            <FaHeart />
          </button>
        </div>

        <div className="detalle-info">
          <h1>{juego.nombre}</h1>

          <div className="detalle-stats">
            <span>⭐ Rating: {juego.rating}</span>

            <span>🎯 Metacritic: {juego.metacritic}</span>
          </div>

          <p className="detalle-generos">{juego.generos?.join(", ")}</p>

          <div
            className="detalle-desc"
            dangerouslySetInnerHTML={{
              __html: juego.descripcion,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;
