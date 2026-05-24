const { OfertaHome, OfertaTienda } = require("../models");
const itadService = require("../services/itadService");

const formatearDeal = (oferta) => ({
  tienda: oferta.shop?.name || "Desconocida",
  precioActual: oferta.price?.amount || 0,
  precioNormal: oferta.regular?.amount || 0,
  descuento: oferta.cut || 0,
  moneda: oferta.price?.currency || "USD",
  drm: oferta.drm?.map((item) => item.name) || [],
  plataformas: oferta.platforms?.map((item) => item.name) || [],
  url: oferta.url || "",
  expiracion: oferta.expiry || null,
  ahorro: (oferta.regular?.amount || 0) - (oferta.price?.amount || 0),
});

const formatearHistorial = (item) => ({
  fecha: item.timestamp,
  tienda: item.shop?.name || "Desconocida",
  precio: item.deal?.price?.amount || 0,
  precioRegular: item.deal?.regular?.amount || 0,
  descuento: item.deal?.cut || 0,
});

const crearRespuestaFallback = (oferta) => ({
  juego: {
    id: oferta.juegoId,
    nombre: oferta.nombre,
    imagen: oferta.imagen,
    metacritic: oferta.metacritic || 0,
    tiendaId: oferta.tiendaId,
    tienda: oferta.tienda,
    precioActual: oferta.precioActual,
    precioNormal: oferta.precioNormal,
    descuento: oferta.descuento,
    url: oferta.url,
  },
  mejorOferta: {
    tienda: oferta.tienda,
    precioActual: oferta.precioActual,
    precioNormal: oferta.precioNormal,
    descuento: oferta.descuento,
    moneda: "USD",
    drm: [],
    plataformas: [],
    url: oferta.url,
    expiracion: null,
    ahorro: (oferta.precioNormal || 0) - (oferta.precioActual || 0),
  },
  ofertas: [
    {
      tienda: oferta.tienda,
      precioActual: oferta.precioActual,
      precioNormal: oferta.precioNormal,
      descuento: oferta.descuento,
      moneda: "USD",
      drm: [],
      plataformas: [],
      url: oferta.url,
      expiracion: null,
      ahorro: (oferta.precioNormal || 0) - (oferta.precioActual || 0),
    },
  ],
  historialPrecios: [],
});

const getTiendas = async (req, res) => {
  try {
    const ofertas = await OfertaHome.findAll({
      order: [["score", "DESC"]],
    });

    const tiendasMap = {};

    ofertas.forEach((oferta) => {
      if (!tiendasMap[oferta.tiendaId]) {
        tiendasMap[oferta.tiendaId] = {
          tiendaId: oferta.tiendaId,
          tienda: oferta.tienda,
          juegos: [],
        };
      }

      tiendasMap[oferta.tiendaId].juegos.push({
        id: oferta.juegoId,
        nombre: oferta.nombre,
        imagen: oferta.imagen,
        precioActual: oferta.precioActual,
        precioNormal: oferta.precioNormal,
        descuento: oferta.descuento,
        metacritic: oferta.metacritic,
        tiendaId: oferta.tiendaId,
        tienda: oferta.tienda,
        url: oferta.url,
        score: oferta.score,
      });
    });

    return res.json(Object.values(tiendasMap));
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error obteniendo tiendas",
    });
  }
};

const getTiendaById = async (req, res) => {
  try {
    const { id } = req.params;

    const juegos = await OfertaTienda.findAll({
      where: {
        tiendaId: id,
      },
      order: [["score", "DESC"]],
    });

    if (!juegos.length) {
      return res.status(404).json({
        error: "Tienda no encontrada",
      });
    }

    return res.json({
      tiendaId: id,
      tienda: juegos[0].tienda,
      juegos,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error obteniendo tienda",
    });
  }
};

const getOfertaDetalle = async (req, res) => {
  try {
    const { tiendaId, juegoId } = req.params;

    const oferta =
      (await OfertaTienda.findOne({
        where: {
          tiendaId,
          juegoId,
        },
      })) ||
      (await OfertaHome.findOne({
        where: {
          tiendaId,
          juegoId,
        },
      }));

    if (!oferta) {
      return res.status(404).json({
        error: "Oferta no encontrada",
      });
    }

    const fallback = crearRespuestaFallback(oferta);

    try {
      const respuestaPrecios = await itadService.obtenerOfertas(juegoId);
      const historial = await itadService.obtenerHistorialPrecio(juegoId);
      const deals = Array.isArray(respuestaPrecios?.[0]?.deals)
        ? respuestaPrecios[0].deals
        : [];

      if (!deals.length) {
        return res.json({
          ...fallback,
          historialPrecios: historial.map(formatearHistorial),
        });
      }

      const ofertas = deals
        .map(formatearDeal)
        .sort((a, b) => a.precioActual - b.precioActual);

      const mejorOferta = ofertas[0] || fallback.mejorOferta;

      return res.json({
        juego: fallback.juego,
        mejorOferta,
        ofertas,
        historialPrecios: historial.map(formatearHistorial),
      });
    } catch (error) {
      console.log(
        "Error consultando ITAD para detalle de oferta:",
        error.response?.data || error.message,
      );

      return res.json(fallback);
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error obteniendo detalle de oferta",
    });
  }
};

module.exports = {
  getTiendas,
  getTiendaById,
  getOfertaDetalle,
};
