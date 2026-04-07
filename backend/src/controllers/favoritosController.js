const Favorito = require("../models/Favorito");

//se crea un favorito
const crearFavorito = async (req, res) => {
  try {
    const favorito = await Favorito.create(req.body);
    res.json(favorito);
  } catch (error) {
    res.status(500).json(error);
  }
};

//obtener favoritos
const obtenerFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.findAll();
    res.json(favoritos);
  } catch (error) {
    res.status(500).json(error);
  }
};

//elimina favorito
const eliminarFavorito = async (req, res) => {
  try {
    const { id } = req.params;
    await Favorito.destroy({ where: { id } });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports={
    crearFavorito,
    obtenerFavoritos,
    eliminarFavorito
}