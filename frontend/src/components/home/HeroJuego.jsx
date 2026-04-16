import { useEffect, useState } from "react";
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
const HeroJuego = () => {
  const [juegos, setJuegos] = useState([]);
  const getIcono = (plataforma) => {
    if (plataforma === "PC") return <FaWindows />;
    if (plataforma === "PlayStation") return <FaPlaystation />;
    if (plataforma === "Xbox") return <FaXbox />;
    return null;
  };
  useEffect(() => {
    fetch("http://localhost:3000/games/top")
      .then((res) => res.json())
      .then((data) => setJuegos(data));
  }, []);
  if (juegos.length === 0) {
    return <p>Cargando ...</p>;
  }
  return (
    <div className="hero">
      {juegos.map((juego) => (
        <div key={juego.id} className="hero-card">
          <img src={juego.imagen} alt={juego.nombre} />
          <h2>{juego.nombre}</h2>
          <p
            className={`metacritic ${
              juego.metacritic > 85
                ? "alto"
                : juego.metacritic >= 70
                  ? "medio"
                  : "bajo"
            }`}
          >
            Metacritic: {juego.metacritic}
          </p>
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
  );
};
export default HeroJuego;
