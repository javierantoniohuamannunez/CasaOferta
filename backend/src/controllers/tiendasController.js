const { OfertaHome } = require("../models");

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

    const ofertas = await OfertaHome.findAll({
      where: {
        tiendaId: id,
      },

      order: [["score", "DESC"]],
    });

    if (!ofertas.length) {
      return res.status(404).json({
        error: "Tienda no encontrada",
      });
    }

    return res.json({
      tiendaId: ofertas[0].tiendaId,
      tienda: ofertas[0].tienda,
      juegos: ofertas,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error obteniendo tienda",
    });
  }
};

module.exports = {
  getTiendas,
  getTiendaById,
};