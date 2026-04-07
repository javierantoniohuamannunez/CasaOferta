const rawgService = require('../services/rawgService');

// obtiene la lista de juegos por busqueda
const getGames = async (req, res, next) => {
  try {
    const { buscar } = req.query;

       if (!buscar) {
      return res.status(400).json({
        ok: false,
        error: "Falta el parametro 'buscar'"
      });
    }
    const games = await rawgService.buscarGames(buscar);

    res.json(games);
  } catch (error) {
    next(error);
  }
};

module.exports = { getGames };