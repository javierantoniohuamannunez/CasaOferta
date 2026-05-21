import "./detallejuego.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaLinux,
  FaHeart,
  FaBell,
} from "react-icons/fa";
import { obtenerOfertasJuego } from "../../services/api";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavorito,
} from "../../services/favoritos";
import { crearAlerta } from "../../services/alertas";
import PrecioChart from "../../components/PrecioChart";

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
        console.log(data);
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
        ultimoPrecio: mejorOferta?.precioActual || 0,
      });

      alert("Juego añadido a tu wishlist 🔔");
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

          <div className="detalle-actions">
            <button
              className={`detalle-favorito ${favorito ? "activo" : ""}`}
              onClick={toggleFavorito}
            >
              <FaHeart />
            </button>

            <button className="detalle-alerta" onClick={handleCrearAlerta}>
              <FaBell />
            </button>
          </div>
        </div>

        <div className="detalle-info">
          <h1>{juego.nombre}</h1>

          <div className="detalle-stats">
            <span>Rating: {juego.rating}</span>

            <span>Metacritic: {juego.metacritic}</span>
          </div>

          {mejorOferta && (
            <div className="mejor-oferta">
              <h2>Mejor oferta</h2>

              <div className="oferta-box">
                <div>
                  <h3>{mejorOferta.tienda}</h3>

                  <p>
                    {mejorOferta.precioActual} {mejorOferta.moneda}
                  </p>
                </div>

                <div className="oferta-extra">
                  <span className="descuento">-{mejorOferta.descuento}%</span>

                  <a href={mejorOferta.url} target="_blank" rel="noreferrer">
                    Ver oferta
                  </a>
                </div>
              </div>
            </div>
          )}

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

          <div className="detalle-desc">
            <p>{juego.descripcion}</p>
          </div>

          <div className="historial-container">
            <h2>Historial de precios</h2>

            {historialPrecios.length > 0 ? (
              <PrecioChart historial={historialPrecios} />
            ) : (
              <p>No hay historial de precios</p>
            )}
          </div>

          {ofertas.length > 0 && (
            <div className="lista-ofertas">
              <h2>Todas las ofertas</h2>

              {ofertas.map((oferta, index) => (
                <div key={index} className="oferta-item">
                  <div>
                    <strong>{oferta.tienda}</strong>
                    <p>
                      {oferta.precioActual} {oferta.moneda}
                    </p>
                    <small>Antes: {oferta.precioNormal}</small>
                  </div>

                  <div className="oferta-extra">
                    <span>-{oferta.descuento}%</span>
                    <a href={oferta.url} target="_blank" rel="noreferrer">
                      Ir a tienda
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleJuego;
