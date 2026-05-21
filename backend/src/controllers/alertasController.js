const { Alerta } = require("../models");

// crear alerta
const crearAlerta = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const { juegoId, nombreJuego, precioObjetivo } = req.body;

    // validar
    if (!juegoId || !nombreJuego || !precioObjetivo) {
      return res.status(400).json({
        error: "Faltan datos",
      });
    }

    // crear alerta
    const alerta = await Alerta.create({
      usuarioId,
      juegoId,
      nombreJuego,
      precioObjetivo,
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
      },

      order: [["createdAt", "DESC"]],
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

    const { id } = req.params;

    const alerta = await Alerta.findOne({
      where: {
        id,
        usuarioId,
      },
    });

    if (!alerta) {
      return res.status(404).json({
        error: "Alerta no encontrada",
      });
    }

    await alerta.destroy();

    return res.json({
      ok: true,
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
