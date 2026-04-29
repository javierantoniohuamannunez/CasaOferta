import { useEffect, useState } from "react";
import { FaWindows, FaPlaystation, FaXbox, FaLinux } from "react-icons/fa";
import { obtenerJuegosPorGenero } from "../../services/api";
import { useNavigate } from "react-router-dom";

const ResultadosGenero = ({ categoria }) => {
  const [juegos, setJuegos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoria) return;

    const cargar = async () => {
      try {
        const data = await obtenerJuegosPorGenero(categoria.id);
        setJuegos(data);
      } catch (error) {
        console.error("Error al cargar juegos por género:", error);
        setJuegos([]);
      }
    };

    cargar();
  }, [categoria]);

  const getIcono = (plataforma) => {
    if (plataforma.includes("PC")) return <FaWindows />;
    if (plataforma.includes("PlayStation")) return <FaPlaystation />;
    if (plataforma.includes("Xbox")) return <FaXbox />;
    if (plataforma.includes("Linux")) return <FaLinux />;
    return null;
  };

  return (
    <div>
      <h2 className="titulo-seccion">Categoría: {categoria?.nombre}</h2>

      {juegos.length === 0 ? (
        <p style={{ padding: "20px" }}>No hay resultados</p>
      ) : (
        <div className="grid-juegos">
          {juegos.map((juego) => (
            <div
              key={juego.id}
              className="hero-card"
              onClick={() => navigate(`/juego/${juego.id}`)}
              style={{ cursor: "pointer" }}
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
                {juego.plataformas?.map((p, i) => {
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

export default ResultadosGenero;
