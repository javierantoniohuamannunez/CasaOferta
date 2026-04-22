import { useEffect, useState } from "react";
import { FaWindows, FaPlaystation, FaXbox, FaLinux } from "react-icons/fa";

const Resultados = ({ busqueda }) => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    if (!busqueda) return;

    fetch(`http://localhost:3000/games?buscar=${busqueda}`)
      .then((res) => res.json())
      .then((data) => setJuegos(data))
      .catch((error) => {
        console.error("Error al buscar juegos:", error);
        setJuegos([]);
      });
  }, [busqueda]);

  // 🔥 ICONOS
  const getIcono = (plataforma) => {
    if (plataforma.includes("PC")) return <FaWindows />;
    if (plataforma.includes("PlayStation")) return <FaPlaystation />;
    if (plataforma.includes("Xbox")) return <FaXbox />;
    if (plataforma.includes("Linux")) return <FaLinux />;
    return null;
  };

  // 🔥 FORMATEO
  const juegosFormateados = juegos.map((j) => ({
    id: j.id,
    nombre: j.name,
    imagen: j.background_image || "https://via.placeholder.com/300x150",
    metacritic: j.metacritic ?? 0,
    plataformas: j.platforms
      ? j.platforms.map((p) => p.platform.name)
      : [],
  }));

  return (
    <div>
      <h2 className="titulo-seccion">
        Resultados para: {busqueda}
      </h2>

      {juegos.length === 0 ? (
        <p style={{ padding: "20px" }}>No hay resultados</p>
      ) : (
        <div className="grid-juegos">
          {juegosFormateados.map((juego) => (
            <div key={juego.id} className="hero-card">
              
              {/* IMAGEN */}
              <img src={juego.imagen} alt={juego.nombre} />

              {/* NOMBRE */}
              <h2>{juego.nombre}</h2>

              {/* METACRITIC */}
              {juego.metacritic > 0 && (
                <p
                  className={`metacritic ${
                    juego.metacritic > 85
                      ? "alto"
                      : juego.metacritic >= 70
                      ? "medio"
                      : "bajo"
                  }`}
                >
                  {juego.metacritic}
                </p>
              )}

              {/* PLATAFORMAS */}
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