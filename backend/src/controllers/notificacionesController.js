const { Notificacion } = require("../models");

//  notificaciones
const obtenerNotificaciones = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const notificaciones = await Notificacion.findAll({
      where: {
        usuarioId,
      },

      order: [["createdAt", "DESC"]],
    });

    return res.json(notificaciones);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error obteniendo notificaciones",
    });
  }
};

//  leido
const marcarLeida = async (req, res) => {
  try {
    const { id } = req.params;

    const notificacion = await Notificacion.findByPk(id);

    if (!notificacion) {
      return res.status(404).json({
        error: "Notificacion no encontrada",
      });
    }

    notificacion.leida = true;

    await notificacion.save();

    return res.json({
      mensaje: "Notificacion leida",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Error actualizando notificacion",
    });
  }
};

module.exports = {
  obtenerNotificaciones,
  marcarLeida,
};
