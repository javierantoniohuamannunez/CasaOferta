const tiendasService = require("../services/tiendasService");

const getTiendas = async (req, res, next) => {
  try {
    const data = await tiendasService.obtenerTiendasHome();

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTiendas,
};
