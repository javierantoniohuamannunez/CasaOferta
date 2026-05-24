const express = require("express");

const router = express.Router();

const verificarToken = require("../../middlewares/auth");

const {
  obtenerNotificaciones,
  marcarLeida,
} = require("../controllers/notificacionesController");

// obtener notificaciones
router.get("/", verificarToken, obtenerNotificaciones);

// marcar leido
router.put("/:id", verificarToken, marcarLeida);

module.exports = router;
