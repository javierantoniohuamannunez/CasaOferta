const express = require("express");
const router = express.Router();
const verificarToken = require("../../middlewares/auth");
const {crearAlerta,obtenerAlertas,eliminarAlerta,} = require("../controllers/alertasController");

// crear alerta
router.post("/", verificarToken, crearAlerta);
// obtener alertas usuario
router.get("/", verificarToken, obtenerAlertas);
// eliminar alerta
router.delete("/:id", verificarToken, eliminarAlerta);

module.exports = router;
