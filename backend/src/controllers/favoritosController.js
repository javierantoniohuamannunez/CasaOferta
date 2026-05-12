const Favorito = require("../models/Favorito");
const Usuario = require("../models/Usuario");
const rawgService = require("../services/rawgService");
// crear favorito
const crearFavorito = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { juegoId } = req.body;

    const existe = await Favorito.findOne({
      where: { usuarioId, juegoId },
    });

    if (existe) {
      return res.status(400).json({
        ok: false,
        error: "Ya está en favoritos",
      });
    }

    const favorito = await Favorito.create({
      usuarioId,
      juegoId,
    });

    res.json(favorito);
  } catch (error) {
    res.status(500).json(error);
  }
};

const obtenerFavoritos = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const favoritos = await Favorito.findAll({
      where: { usuarioId },
      include: Usuario,
    });
    const juegos = await Promise.all(
      favoritos.map(async (fav) => {
        const juego = await rawgService.obtenerJuegoPorId(fav.juegoId);

        return {
          id: juego.id,
          nombre: juego.nombre,
          imagen: juego.imagen,
          rating: juego.rating,
          metacritic: juego.metacritic,
        };
      }),
    );

    res.json(juegos);
  } catch (error) {
    res.status(500).json(error);
  }
};
const eliminarFavorito = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { juegoId } = req.params;
    await Favorito.destroy({
      where: { usuarioId, juegoId },
    });

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  crearFavorito,
  obtenerFavoritos,
  eliminarFavorito,
};
