const express = require("express");

const router = express.Router();

const {
  getTiendas,
  getTiendaById,
  getOfertaDetalle,
} = require("../controllers/tiendasController");

router.get("/home", getTiendas);
router.get("/:tiendaId/ofertas/:juegoId", getOfertaDetalle);
router.get("/:id", getTiendaById);

module.exports = router;
