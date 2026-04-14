const rawgService = require("../services/rawgService");

// obtiene la lista de juegos por busqueda
const getGames = async (req, res, next) => {
  try {
    const { buscar } = req.query;

    if (!buscar) {
      return res.status(400).json({
        ok: false,
        error: "Falta el parametro 'buscar'",
      });
    }
    const games = await rawgService.buscarGames(buscar);

    res.json(games);
  } catch (error) {
    next(error);
  }
};
// Obtener detalle de juego
const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const juego = await rawgService.obtenerJuegoPorId(id);

    res.json({
      nombre: juego.name,
      descripcion: juego.description_raw,
      imagen: juego.background_image,
      rating: juego.rating,
      generos: juego.genres.map((g) => g.name),
    });
  } catch (error) {
    next(error);
  }
};
const getTopGames = async (req, res, next) => {
  try {
    const juegos = await rawgService.obtenerJuegosTop();
    res.json(juegos);
  } catch (error) {
    next(error);
  }
};
module.exports = { getGames, getGameById, getTopGames };
