import "./detalleOferta.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaStore,
  FaHeart,
  FaBell,
} from "react-icons/fa";
import PrecioChart from "../PrecioChart";
import { buscarJuegos, obtenerDetalleOferta } from "../../services/api";
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavorito,
} from "../../services/favoritos";
import {
  crearAlerta,
  eliminarAlerta,
  obtenerAlertas,
} from "../../services/alertas";

const formatearPrecio = (precio, moneda = "USD") => {
  if (typeof precio !== "number") {
    return "Sin precio";
  }

  return `${precio.toFixed(2)} ${moneda}`;
};

const normalizarTexto = (texto = "") =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const resolverJuegoRawg = async (nombreJuego) => {
  const resultados = await buscarJuegos(nombreJuego);

  if (!Array.isArray(resultados) || resultados.length === 0) {
    return null;
  }

  const nombreNormalizado = normalizarTexto(nombreJuego);

  const matchExacto = resultados.find(
    (juego) => normalizarTexto(juego.name) === nombreNormalizado,
  );

  const matchParcial = resultados.find((juego) =>
    normalizarTexto(juego.name).includes(nombreNormalizado),
  );

  return matchExacto || matchParcial || resultados[0] || null;
};

const DetalleOferta = () => {
  const { tiendaId, juegoId } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorito, setFavorito] = useState(false);
  const [alertaActiva, setAlertaActiva] = useState(false);
  const [rawgJuegoId, setRawgJuegoId] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await obtenerDetalleOferta(tiendaId, juegoId);
        setDetalle(data);

        const token = localStorage.getItem("token");
        const alertaJuegoId = String(data?.juego?.id ?? juegoId);

        if (!token || !data?.juego?.nombre) {
          return;
        }

        const [favoritosResponse, alertasResponse, rawgJuego] =
          await Promise.all([
            obtenerFavorito(),
            obtenerAlertas(),
            resolverJuegoRawg(data.juego.nombre),
          ]);

        const favoritos = Array.isArray(favoritosResponse)
          ? favoritosResponse
          : favoritosResponse?.favoritos || [];
        const alertas = Array.isArray(alertasResponse) ? alertasResponse : [];
        const resolvedRawgId = rawgJuego?.id ? Number(rawgJuego.id) : null;

        setRawgJuegoId(resolvedRawgId);
        setFavorito(
          resolvedRawgId !== null &&
            favoritos.some((fav) => Number(fav.id) === resolvedRawgId),
        );
        setAlertaActiva(
          alertas.some((alerta) => String(alerta.juegoId) === alertaJuegoId),
        );
      } catch (err) {
        console.log(err);
        setError("No se pudo cargar el detalle de la oferta");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [tiendaId, juegoId]);

  if (loading) {
    return <p style={{ padding: 24 }}>Cargando oferta...</p>;
  }

  if (error || !detalle?.juego) {
    return <p style={{ padding: 24 }}>{error || "Oferta no encontrada"}</p>;
  }

  const { juego, mejorOferta, ofertas = [], historialPrecios = [] } = detalle;
  const alertaJuegoId = String(juego.id ?? juegoId);

  const toggleFavorito = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión");
      return;
    }

    if (!rawgJuegoId) {
      alert("No pude vincular esta oferta con un juego del perfil");
      return;
    }

    try {
      if (favorito) {
        await eliminarFavorito(rawgJuegoId);
        setFavorito(false);
      } else {
        await agregarFavorito(rawgJuegoId);
        setFavorito(true);
      }
    } catch (favError) {
      console.log(favError);
      alert(favError?.response?.data?.error || "Error actualizando favorito");
    }
  };

  const toggleAlerta = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión");
      return;
    }

    try {
      if (alertaActiva) {
        await eliminarAlerta(alertaJuegoId);
        setAlertaActiva(false);
        alert("Juego eliminado de tu lista de deseo");
        return;
      }

      await crearAlerta({
        juegoId: alertaJuegoId,
        nombreJuego: juego.nombre,
        imagen: juego.imagen,
        precioBase: mejorOferta?.precioNormal ?? juego.precioNormal ?? 0,
      });

      setAlertaActiva(true);
      alert("Juego añadido a tu lista de deseo");
    } catch (alertaError) {
      console.log(alertaError);
      alert(alertaError.response?.data?.error || "Error actualizando alerta");
    }
  };

  return (
    <section className="detalle-oferta-page">
      <div className="detalle-oferta-backdrop">
        <img src={juego.imagen} alt={juego.nombre} />
      </div>
      <div className="detalle-oferta-overlay"></div>

      <div className="detalle-oferta-shell">
        <Link to={`/tienda/${juego.tiendaId}`} className="detalle-oferta-back">
          <FaArrowLeft />
          Volver a {juego.tienda}
        </Link>

        <div className="detalle-oferta-hero">
          <div className="detalle-oferta-media">
            <img
              src={juego.imagen}
              alt={juego.nombre}
              className="detalle-oferta-cover"
            />

            <div className="detalle-oferta-actions-stack">
              <button
                className={`detalle-oferta-btn favorito ${favorito ? "activo" : ""}`}
                onClick={toggleFavorito}
                title={
                  rawgJuegoId
                    ? favorito
                      ? "Quitar de favoritos"
                      : "Agregar a favoritos"
                    : "No pude vincular esta oferta al perfil"
                }
              >
                <FaHeart />
              </button>

              <button
                className={`detalle-oferta-btn alerta ${alertaActiva ? "activo" : ""}`}
                onClick={toggleAlerta}
                title={
                  alertaActiva
                    ? "Quitar de lista de deseo"
                    : "Agregar a lista de deseo"
                }
              >
                <FaBell />
              </button>
            </div>
          </div>

          <div className="detalle-oferta-copy">
            <div className="detalle-oferta-labels">
              <span className="detalle-oferta-badge principal">
                <FaStore />
                {juego.tienda}
              </span>
              {juego.metacritic > 0 && (
                <span className="detalle-oferta-badge score">
                  Metacritic {juego.metacritic}
                </span>
              )}
            </div>

            <h1>{juego.nombre}</h1>

            <p className="detalle-oferta-subtitle">
              Oferta de iTad, juego de {juego.plataforma} sin descripcion
            </p>

            <div className="detalle-oferta-pricebox">
              <div>
                <span className="detalle-oferta-caption">Precio actual</span>
                <strong>
                  {formatearPrecio(
                    mejorOferta?.precioActual ?? juego.precioActual,
                    mejorOferta?.moneda,
                  )}
                </strong>
              </div>

              <div>
                <span className="detalle-oferta-caption">Precio anterior</span>
                <span className="detalle-oferta-oldprice">
                  {formatearPrecio(
                    mejorOferta?.precioNormal ?? juego.precioNormal,
                    mejorOferta?.moneda,
                  )}
                </span>
              </div>

              <div>
                <span className="detalle-oferta-caption">Descuento</span>
                <span className="detalle-oferta-discount">
                  -{mejorOferta?.descuento ?? juego.descuento}%
                </span>
              </div>
            </div>

            <div className="detalle-oferta-actions">
              {mejorOferta?.url && (
                <a href={mejorOferta.url} target="_blank" rel="noreferrer">
                  Ver en tienda
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="detalle-oferta-grid">
          <div className="detalle-oferta-panel wide">
            <div className="detalle-oferta-panelhead">
              <h2>Historial de precios</h2>
              <span>{historialPrecios.length} registros</span>
            </div>

            {historialPrecios.length > 0 ? (
              <PrecioChart historial={historialPrecios} />
            ) : (
              <p className="detalle-oferta-empty">
                ITAD no devolvió historial para esta oferta.
              </p>
            )}
          </div>

          <div className="detalle-oferta-panel">
            <div className="detalle-oferta-panelhead">
              <h2>Mejor oferta</h2>
              <span>{mejorOferta?.tienda || juego.tienda}</span>
            </div>

            <div className="detalle-oferta-summary">
              <strong>
                {formatearPrecio(
                  mejorOferta?.precioActual ?? juego.precioActual,
                  mejorOferta?.moneda,
                )}
              </strong>
              <span>
                Antes{" "}
                {formatearPrecio(
                  mejorOferta?.precioNormal ?? juego.precioNormal,
                  mejorOferta?.moneda,
                )}
              </span>
              <span>
                Ahorro{" "}
                {formatearPrecio(mejorOferta?.ahorro ?? 0, mejorOferta?.moneda)}
              </span>
            </div>
          </div>
        </div>

        <div className="detalle-oferta-panel ofertas-lista">
          <div className="detalle-oferta-panelhead">
            <h2>Ofertas disponibles</h2>
            <span>{ofertas.length}</span>
          </div>

          {ofertas.length > 0 ? (
            <div className="detalle-oferta-list">
              {ofertas.map((oferta, index) => (
                <article
                  key={`${oferta.tienda}-${index}`}
                  className="detalle-oferta-item"
                >
                  <div>
                    <h3>{oferta.tienda}</h3>
                    <p>{formatearPrecio(oferta.precioActual, oferta.moneda)}</p>
                    <small>
                      Antes{" "}
                      {formatearPrecio(oferta.precioNormal, oferta.moneda)}
                    </small>
                  </div>

                  <div className="detalle-oferta-meta">
                    <span className="descuento">-{oferta.descuento}%</span>
                    {oferta.expiracion && (
                      <small>
                        Expira:{" "}
                        {new Date(oferta.expiracion).toLocaleDateString()}
                      </small>
                    )}
                    {oferta.url && (
                      <a href={oferta.url} target="_blank" rel="noreferrer">
                        Ir a tienda
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="detalle-oferta-empty">
              No hay más tiendas disponibles para este juego.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetalleOferta;
