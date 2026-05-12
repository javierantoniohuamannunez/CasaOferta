import "./detallejuego.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerJuegoPorId } from "../../services/api";
import { FaWindows, FaPlaystation, FaXbox, FaLinux } from "react-icons/fa";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavorito,
} from "../../services/favoritos";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
const DetalleJuego = () => {
  const { id } = useParams();

  const [juego, setJuego] = useState(null);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerJuegoPorId(id);
      setJuego(data);
    };

    const cargarFavoritos = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await obtenerFavorito();

        console.log(response);

        const favoritos = response.favoritos || [];
        const existe = favoritos.some((fav) => fav.juegoId === Number(id));

        setFavorito(existe);
      } catch (error) {
        console.log(error);
      }
    };

    cargar();
    cargarFavoritos();
  }, [id]);

  const toggleFavorito = async () => {
    try {
      if (favorito) {
        await eliminarFavorito(id);

        setFavorito(false);
      } else {
        await agregarFavorito(id);

        setFavorito(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getIcono = (plataforma) => {
    if (plataforma.includes("PC")) return <FaWindows />;
    if (plataforma.includes("PlayStation")) return <FaPlaystation />;
    if (plataforma.includes("Xbox")) return <FaXbox />;
    if (plataforma.includes("Linux")) return <FaLinux />;

    return null;
  };
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

          <button
            className={`detalle-favorito ${favorito ? "activo" : ""}`}
            onClick={toggleFavorito}
          >
            <FaHeart />
          </button>
        </div>

        <div className="detalle-info">
          <h1>{juego.nombre}</h1>

          <div className="detalle-stats">
            <span>⭐ Rating: {juego.rating}</span>
            <span>🎯 Metacritic: {juego.metacritic}</span>
          </div>
          <div className="detalle-plataformas">
            {juego.plataformas?.map((plat) => (
              <span key={plat} className="plataforma-icono">
                {getIcono(plat)}
              </span>
            ))}
          </div>
          <div className="detalle-generos">
            {juego.generos?.map((gen) => (
              <Link
                key={gen.id}
                to={`/categoria/${gen.id}`}
                className="genero-tag"
              >
                {gen.nombre}
              </Link>
            ))}
          </div>
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
