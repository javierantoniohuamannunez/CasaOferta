const express = require("express");

const router = express.Router();

const {getTiendas,getTiendaById} = require("../controllers/tiendasController");

router.get("/home", getTiendas);
router.get("/:id", getTiendaById);

module.exports = router;
