import "./detallejuego.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaLinux,
  FaHeart,
  FaBell,
  FaExternalLinkAlt,
  FaChartLine,
  FaGamepad,
} from "react-icons/fa";
import { obtenerOfertasJuego } from "../../services/api";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavorito,
} from "../../services/favoritos";
import { crearAlerta } from "../../services/alertas";
import PrecioChart from "../../components/PrecioChart";

const formatearPrecio = (precio, moneda = "USD") => {
  if (typeof precio !== "number") {
    return "Sin precio";
  }

  return `${precio.toFixed(2)} ${moneda}`;
};

const DetalleJuego = () => {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);
  const [favorito, setFavorito] = useState(false);
  const [ofertas, setOfertas] = useState([]);
  const [mejorOferta, setMejorOferta] = useState(null);
  const [historialPrecios, setHistorialPrecios] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerOfertasJuego(id);

        setJuego(data.juego);
        setOfertas(data.ofertas || []);
        setMejorOferta(data.mejorOferta || null);
        setHistorialPrecios(data.historialPrecios || []);
      } catch (error) {
        console.log(error);
      }
    };

    const cargarFavoritos = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await obtenerFavorito();
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

  const handleCrearAlerta = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Debes iniciar sesión");
        return;
      }

      await crearAlerta({
        juegoId: juego.id,
        nombreJuego: juego.nombre,
        imagen: juego.imagen,
        precioBase: mejorOferta?.precioNormal || 0,
      });

      alert("Juego añadido a tu lista de deseo");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.error || "Error creando alerta");
    }
  };

  const getIcono = (plataforma) => {
    if (plataforma.includes("PC") || plataforma.includes("Windows")) {
      return <FaWindows />;
    }
    if (plataforma.includes("PlayStation")) {
      return <FaPlaystation />;
    }
    if (plataforma.includes("Xbox")) {
      return <FaXbox />;
    }
    if (plataforma.includes("Linux")) {
      return <FaLinux />;
    }

    return null;
  };

  if (!juego) {
    return <p style={{ padding: 24 }}>Cargando...</p>;
  }

  return (
    <section className="detalle-juego-page">
      <div className="detalle-juego-backdrop">
        <img src={juego.imagen} alt={juego.nombre} />
      </div>
      <div className="detalle-juego-overlay"></div>

      <div className="detalle-juego-shell">
        <div className="detalle-juego-hero">
          <div className="detalle-juego-media">
            <img
              src={juego.imagen}
              alt={juego.nombre}
              className="detalle-juego-cover"
            />

            <div className="detalle-juego-actions">
              <button
                className={`detalle-juego-btn favorito ${favorito ? "activo" : ""}`}
                onClick={toggleFavorito}
              >
                <FaHeart />
              </button>

              <button
                className="detalle-juego-btn alerta"
                onClick={handleCrearAlerta}
              >
                <FaBell />
              </button>
            </div>
          </div>

          <div className="detalle-juego-copy">
            <div className="detalle-juego-labels">
              <span className="detalle-juego-badge principal">
                <FaGamepad />
                Juego
              </span>

              {juego.metacritic > 0 && (
                <span className="detalle-juego-badge score">
                  Metacritic {juego.metacritic}
                </span>
              )}

              {juego.rating > 0 && (
                <span className="detalle-juego-badge soft">
                  Rating {Number(juego.rating).toFixed(1)}
                </span>
              )}
            </div>

            <h1>{juego.nombre}</h1>

            <p className="detalle-juego-subtitle">
              Resumen del juego con su mejor precio detectado, evolución
              reciente y acceso directo a todas las tiendas disponibles.
            </p>

            <div className="detalle-juego-pricebox">
              <div>
                <span className="detalle-juego-caption">Mejor precio</span>
                <strong>
                  {formatearPrecio(
                    mejorOferta?.precioActual,
                    mejorOferta?.moneda,
                  )}
                </strong>
              </div>

              <div>
                <span className="detalle-juego-caption">Precio anterior</span>
                <span className="detalle-juego-oldprice">
                  {formatearPrecio(
                    mejorOferta?.precioNormal,
                    mejorOferta?.moneda,
                  )}
                </span>
              </div>

              <div>
                <span className="detalle-juego-caption">Descuento</span>
                <span className="detalle-juego-discount">
                  -{mejorOferta?.descuento || 0}%
                </span>
              </div>
            </div>

            <div className="detalle-juego-actions-row">
              {mejorOferta?.url && (
                <a href={mejorOferta.url} target="_blank" rel="noreferrer">
                  Ver oferta
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>

            <div className="detalle-juego-platforms">
              {juego.plataformas?.map((plat) => {
                const icono = getIcono(plat);

                if (!icono) return null;

                return (
                  <span key={plat} className="plataforma-icono" title={plat}>
                    {icono}
                  </span>
                );
              })}
            </div>

            <div className="detalle-juego-genres">
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
          </div>
        </div>

        <div className="detalle-juego-grid">
          <div className="detalle-juego-panel wide">
            <div className="detalle-juego-panelhead">
              <h2>
                <FaChartLine />
                Historial de precios
              </h2>
              <span>{historialPrecios.length} registros</span>
            </div>

            {historialPrecios.length > 0 ? (
              <PrecioChart historial={historialPrecios} />
            ) : (
              <p className="detalle-juego-empty">No hay historial de precios</p>
            )}
          </div>

          <div className="detalle-juego-panel">
            <div className="detalle-juego-panelhead">
              <h2>Resumen</h2>
              <span>{ofertas.length} tiendas</span>
            </div>

            <div className="detalle-juego-summary">
              <strong>{mejorOferta?.tienda || "Sin oferta"}</strong>
              <span>Lanzamiento: {juego.released || "Sin fecha"}</span>
              <span>Web: {juego.website || "No disponible"}</span>
            </div>
          </div>
        </div>

        <div className="detalle-juego-panel detalle-juego-description">
          <div className="detalle-juego-panelhead">
            <h2>Descripción</h2>
          </div>

          <p>{juego.descripcion}</p>
        </div>

        <div className="detalle-juego-panel ofertas-lista">
          <div className="detalle-juego-panelhead">
            <h2>Todas las ofertas</h2>
            <span>{ofertas.length}</span>
          </div>

          {ofertas.length > 0 ? (
            <div className="detalle-juego-list">
              {ofertas.map((oferta, index) => (
                <article
                  key={`${oferta.tienda}-${index}`}
                  className="detalle-juego-item"
                >
                  <div>
                    <h3>{oferta.tienda}</h3>
                    <p>{formatearPrecio(oferta.precioActual, oferta.moneda)}</p>
                    <small>
                      Antes{" "}
                      {formatearPrecio(oferta.precioNormal, oferta.moneda)}
                    </small>
                  </div>

                  <div className="detalle-juego-meta">
                    <span className="descuento">-{oferta.descuento}%</span>
                    {oferta.expiracion && (
                      <small>
                        Expira:{" "}
                        {new Date(oferta.expiracion).toLocaleDateString()}
                      </small>
                    )}
                    <a href={oferta.url} target="_blank" rel="noreferrer">
                      Ir a tienda
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="detalle-juego-empty">
              No hay ofertas disponibles para este juego.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetalleJuego;
