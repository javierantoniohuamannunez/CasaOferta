const ofertasService = require('../services/ofertasService');

// obtiene ofertas
const getOfertas = async (req, res, next) => {
  try {
    const ofertas = await ofertasService.obtenerOfertas();
    res.json(ofertas);
  } catch (error) {
    next(error);
  }
};

module.exports = {getOfertas};