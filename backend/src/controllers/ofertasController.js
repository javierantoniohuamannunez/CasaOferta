const ofertasService = require('../services/ofertasService');

// obtiene ofertas
const getOfertas = async (req, res, next) => {
  try {
    const { buscar } = req.query;

    const ofertas = await ofertasService.buscarOfertas(buscar);
if (!buscar) {
  return res.status(400).json({
    ok: false,
    error: "Falta el parametro 'buscar'"
  });
}
    res.json(ofertas);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOfertas
};