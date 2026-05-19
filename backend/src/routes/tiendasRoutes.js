const express = require("express");
const router = express.Router();

const { getTiendas } = require("../controllers/tiendasController");

// home tiendas
router.get("/home", getTiendas);

module.exports = router;
