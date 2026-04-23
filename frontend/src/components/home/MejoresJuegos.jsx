import { useEffect, useState, useRef } from "react";
import { FaWindows, FaPlaystation, FaXbox, FaLinux } from "react-icons/fa";

const MejoresJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const carruselRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/games/top")
      .then((res) => res.json())
      .then((data) => setJuegos(data))
      .catch((err) => console.log("Error:", err));
  }, []);

  const getIcono = (plataforma) => {
    if (plataforma.includes("PC")) return <FaWindows />;
    if (plataforma.includes("PlayStation")) return <FaPlaystation />;
    if (plataforma.includes("Xbox")) return <FaXbox />;
    if (plataforma.includes("Linux")) return <FaLinux />;
    return null;
  };

  const scroll = (direccion) => {
    const container = carruselRef.current;
    const scrollAmount = 300;

    if (direccion === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (juegos.length === 0) {
    return (
      <div className="hero">
        <div className="hero-card loading"></div>
        <div className="hero-card loading"></div>
        <div className="hero-card loading"></div>
        <div className="hero-card loading"></div>
      </div>
    );
  }

  return (
    <div className="hero-container">
      <h2 className="titulo-home">Juegos Destacados</h2>

      <button className="btn left" onClick={() => scroll("left")}>
        ◀
      </button>

      <div className="hero" ref={carruselRef}>
        {juegos.map((juego) => (
          <div key={juego.id} className="hero-card">
            <img src={juego.imagen} alt={juego.nombre} />
            <h2>{juego.nombre}</h2>
            Metacritic:{" "}
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

      <button className="btn right" onClick={() => scroll("right")}>
        ▶
      </button>
    </div>
  );
};

export default MejoresJuegos;
