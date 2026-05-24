import "./hero.css";
import { useEffect, useState, useRef } from "react";
import { FaWindows, FaPlaystation, FaXbox, FaLinux } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { obtenerJuegosTop } from "../../services/api";

const formatearPrecio = (precio) =>
  typeof precio === "number" ? `€${precio.toFixed(2)}` : "Sin precio";

const MejoresJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const carruselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerJuegosTop();

        setJuegos(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    cargar();
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
    const scrollAmount = 350;

    if (direccion === "left") {
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
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
    <section className="hero-container" id="destacados">
      <div className="hero-header">
        <h2 className="titulo-home">Juegos destacados</h2>
        <p className="hero-subtitle">
          Los títulos más populares y mejor valorados.
        </p>
      </div>

      <button className="btn-scroll left" onClick={() => scroll("left")}>
        ‹
      </button>

      <div className="hero" ref={carruselRef}>
        {juegos.map((juego) => (
          <div
            key={juego.id}
            className="hero-card"
            onClick={() => navigate(`/juego/${juego.id}`)}
          >
            <div className="hero-img">
              <img src={juego.imagen} alt={juego.nombre} />
              <div className="hero-overlay"></div>

              {juego.metacritic > 0 && (
                <div
                  className={`metacritic ${
                    juego.metacritic > 85
                      ? "alto"
                      : juego.metacritic >= 70
                        ? "medio"
                        : "bajo"
                  }`}
                >
                  {juego.metacritic}
                </div>
              )}
            </div>

            <div className="hero-content">
              <h2>{juego.nombre}</h2>

              <div className="hero-precios">
                {typeof juego.precioNormal === "number" &&
                  typeof juego.precioActual === "number" &&
                  juego.precioNormal > juego.precioActual && (
                    <span className="precio-original">
                      {formatearPrecio(juego.precioNormal)}
                    </span>
                  )}

                <span className="precio-actual">
                  {formatearPrecio(juego.precioActual)}
                </span>

                {juego.descuento > 0 && (
                  <span className="descuento-badge">-{juego.descuento}%</span>
                )}
              </div>

              <div className="plataformas">
                {juego.plataformas?.map((p, i) => {
                  const icono = getIcono(p);

                  if (!icono) return null;

                  return <span key={i}>{icono}</span>;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-scroll right" onClick={() => scroll("right")}>
        ›
      </button>
    </section>
  );
};

export default MejoresJuegos;
