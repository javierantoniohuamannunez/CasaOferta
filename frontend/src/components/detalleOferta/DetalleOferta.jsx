import "./detalleOferta.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaExternalLinkAlt, FaStore } from "react-icons/fa";
import PrecioChart from "../PrecioChart";
import { obtenerDetalleOferta } from "../../services/api";

const formatearPrecio = (precio, moneda = "USD") => {
  if (typeof precio !== "number") {
    return "Sin precio";
  }

  return `${precio.toFixed(2)} ${moneda}`;
};

const DetalleOferta = () => {
  const { tiendaId, juegoId } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await obtenerDetalleOferta(tiendaId, juegoId);

        setDetalle(data);
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
              Vista dedicada para ofertas cacheadas desde ITAD, con precio
              actual, mejor oferta disponible e historial reciente.
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
