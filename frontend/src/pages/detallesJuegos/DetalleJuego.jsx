import "./detallejuego.css";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaLinux,
  FaHeart,
} from "react-icons/fa";

import {
  obtenerJuegoPorId,
  obtenerOfertasJuego,
} from "../../services/api";

import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavorito,
} from "../../services/favoritos";

const DetalleJuego = () => {
  const { id } = useParams();

  const [juego, setJuego] = useState(null);
  const [favorito, setFavorito] = useState(false);

  const [ofertas, setOfertas] = useState([]);
  const [mejorOferta, setMejorOferta] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      try {
        // juego
        const data = await obtenerJuegoPorId(id);
        setJuego(data);

        // ofertas
        const ofertasData = await obtenerOfertasJuego(id);

        setOfertas(ofertasData.ofertas || []);
        setMejorOferta(ofertasData.mejorOferta);
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

        const existe = favoritos.some(
          (fav) => fav.juegoId === Number(id),
        );

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
    if (plataforma.includes("PlayStation"))
      return <FaPlaystation />;
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
        <img
          src={juego.imagen}
          alt={juego.nombre}
        />
      </div>

      <div className="detalle-overlay"></div>

      <div className="detalle-content">
        <button
          className="btn-volver"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>

        <div className="detalle-banner">
          <img
            src={juego.imagen}
            alt={juego.nombre}
            className="detalle-img"
          />

          <button
            className={`detalle-favorito ${
              favorito ? "activo" : ""
            }`}
            onClick={toggleFavorito}
          >
            <FaHeart />
          </button>
        </div>

        <div className="detalle-info">
          <h1>{juego.nombre}</h1>

          <div className="detalle-stats">
            <span>⭐ Rating: {juego.rating}</span>

            <span>
              🎯 Metacritic: {juego.metacritic}
            </span>
          </div>

          {/* OFERTA */}
          {mejorOferta && (
            <div className="mejor-oferta">
              <h3>🔥 Mejor Oferta</h3>

              <div className="oferta-box">
                <span>{mejorOferta.tienda}</span>

                <strong>
                  {mejorOferta.precio}€
                </strong>

                <span className="descuento">
                  -{mejorOferta.descuento}%
                </span>

                <a
                  href={mejorOferta.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver oferta
                </a>
              </div>
            </div>
          )}

          {/* PLATAFORMAS */}
          <div className="detalle-plataformas">
            {juego.plataformas?.map((plat) => (
              <span
                key={plat}
                className="plataforma-icono"
              >
                {getIcono(plat)}
              </span>
            ))}
          </div>

          {/* GENEROS */}
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

          {/* DESCRIPCION */}
          <div
            className="detalle-desc"
            dangerouslySetInnerHTML={{
              __html: juego.descripcion,
            }}
          ></div>

          {/* TODAS LAS OFERTAS */}
          {ofertas.length > 0 && (
            <div className="lista-ofertas">
              <h2>🛒 Todas las ofertas</h2>

              {ofertas.map((oferta, index) => (
                <div
                  key={index}
                  className="oferta-item"
                >
                  <div>
                    <strong>
                      {oferta.shop.name}
                    </strong>

                    <p>
                      {oferta.price.amount}{" "}
                      {oferta.price.currency}
                    </p>
                  </div>

                  <div className="oferta-extra">
                    <span>
                      -{oferta.cut}%
                    </span>

                    <a
                      href={oferta.url}
                      target="_blank"
                      rel="noreferrer"
                    >
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