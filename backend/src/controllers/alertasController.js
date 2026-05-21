const { Alerta } = require("../models");

// crear alerta
const crearAlerta = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { juegoId, nombreJuego, ultimoPrecio } = req.body;
    // validar
    if (!juegoId || !nombreJuego || !ultimoPrecio) {
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
        error: "Ya tienes alerta de este juego",
      });
    }

    const alerta = await Alerta.create({
      usuarioId,
      juegoId,
      nombreJuego,
      ultimoPrecio,
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

// obtener alertas usuario
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
      mensaje: "Alerta eliminada",
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
