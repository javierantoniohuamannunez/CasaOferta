const ofertasService = require('../services/ofertasService');

// obtiene ofertas
const getTopOfertas = async (req, res, next) => {
  try {
    const ofertas = await ofertasService.obtenerTopOfertas();
    res.json(ofertas);
  } catch (error) {
    next(error);
  }
};

module.exports = {getTopOfertas};
