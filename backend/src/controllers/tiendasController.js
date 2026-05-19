const tiendasService = require("../services/tiendasService");

const getTiendas = async (req, res) => {
  try {
    const tiendas = await tiendasService.obtenerTiendas();

    res.json(tiendas);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      error: "Error obteniendo tiendas",
    });
  }
};

module.exports = {
  getTiendas,
};
