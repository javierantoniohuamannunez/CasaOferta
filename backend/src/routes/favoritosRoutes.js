const express = require("express");
const router = express.Router();

const {
  crearFavorito,
  obtenerFavoritos,
  eliminarFavorito,
} = require("../controllers/favoritosController");

const verificarToken = require("../../middlewares/auth"); 

router.post("/", verificarToken, crearFavorito);
router.get("/", verificarToken, obtenerFavoritos);
router.delete("/:juegoId", verificarToken, eliminarFavorito);

module.exports = router;