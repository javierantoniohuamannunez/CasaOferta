const { Alerta } = require("../models");

// crear alerta
const crearAlerta = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { juegoId, nombreJuego, imagen, precioBase } = req.body;
    if (!juegoId || !nombreJuego) {
      return res.status(400).json({
        error: "Faltan datos",
      });
    }

    // evitar duplicados
    const existe = await Alerta.findOne({
      where: {
        usuarioId,
        juegoId,
        activa: true,
      },
    });

    if (existe) {
      return res.status(400).json({
        error: "Ya tienes este juego en wishlist",
      });
    }

    const alerta = await Alerta.create({
      usuarioId,
      juegoId,
      nombreJuego,
      imagen,
      precioBase,
      activa: true,
    });

    return res.json(alerta);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error creando alerta",
    });
  }
};

// obtener alertas
const obtenerAlertas = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const alertas = await Alerta.findAll({
      where: {
        usuarioId,
        activa: true,
      },
    });
    return res.json(alertas);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error obteniendo alertas",
    });
  }
};

// eliminar alerta
const eliminarAlerta = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { juegoId } = req.params;
    await Alerta.destroy({
      where: {
        usuarioId,
        juegoId,
      },
    });
    return res.json({
      mensaje: "Juego eliminado wishlist",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error eliminando alerta",
    });
  }
};

module.exports = {
  crearAlerta,
  obtenerAlertas,
  eliminarAlerta,
};
