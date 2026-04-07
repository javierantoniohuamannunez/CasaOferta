const busquedaService = require("../services/busquedaService");
const getBusquedaCompleta = async (req, res, next) => {
  try {
    const { buscar } = req.query;

    if (!buscar) {
      return res.status(400).json({
        ok: false,
        error: "Falta el parametro 'buscar'",
      });
    }
    const resultado = await busquedaService.buscarCompleto(buscar);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getBusquedaCompleta,
};
