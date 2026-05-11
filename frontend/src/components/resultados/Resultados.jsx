import { useEffect, useState } from "react";
import { FaWindows, FaPlaystation, FaXbox, FaLinux } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { buscarJuegos } from "../../services/api";
import "./resultados.css";

const Resultados = ({ busqueda }) => {
  const [juegos, setJuegos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!busqueda) return;

    const cargar = async () => {
      try {
        const data = await buscarJuegos(busqueda);

        setJuegos(data);
      } catch (error) {
        console.error("Error al buscar juegos:", error);
        setJuegos([]);
      }
    };

    cargar();
  }, [busqueda]);

  const getIcono = (plataforma) => {
    if (plataforma.includes("PC")) return <FaWindows />;
    if (plataforma.includes("PlayStation")) return <FaPlaystation />;
    if (plataforma.includes("Xbox")) return <FaXbox />;
    if (plataforma.includes("Linux")) return <FaLinux />;

    return null;
  };

  const juegosFormateados = juegos.map((j) => ({
    id: j.id,
    nombre: j.name,
    imagen: j.background_image || "https://via.placeholder.com/300x150",

    metacritic: j.metacritic ?? 0,

    plataformas: j.platforms ? j.platforms.map((p) => p.platform.name) : [],
  }));

  return (
    <div className="resultados-container">
      <h2 className="titulo-seccion">Resultados para: {busqueda}</h2>

      {juegos.length === 0 ? (
        <p className="no-resultados">No hay resultados</p>
      ) : (
        <div className="grid-juegos">
          {juegosFormateados.map((juego) => (
            <div
              key={juego.id}
              className="hero-card"
              onClick={() => navigate(`/juego/${juego.id}`)}
            >
              <img src={juego.imagen} alt={juego.nombre} />

              <h2>{juego.nombre}</h2>

              {juego.metacritic > 0 && (
                <div className="info">
                  <span>Metacritic:</span>

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
                </div>
              )}

              <div className="plataformas">
                {juego.plataformas.map((p, i) => {
                  const icono = getIcono(p);

                  if (!icono) return null;

                  return <span key={i}>{icono}</span>;
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resultados;
