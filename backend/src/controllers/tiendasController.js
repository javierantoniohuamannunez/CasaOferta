const { OfertaHome } = require("../models");const getTiendaById = async (req, res) => {
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

    res.json({
      tiendaId: ofertas[0].tiendaId,
      tienda: ofertas[0].tienda,
      juegos: ofertas,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error obteniendo tienda",
    });
  }
};