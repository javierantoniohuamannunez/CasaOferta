const express = require('express');
const router = express.Router();

const { getGames, getJuegoPorId, getTopGames, getJuegosPorGenero, getCategorias } = require('../controllers/gameController');
const {  getOfertasJuego,testITAD, testPrecio } = require('../controllers/gameController');
// GET game
router.get("/categorias", getCategorias);
router.get('/por-genero', getJuegosPorGenero);



// rCheapShark
router.get('/top', getTopGames);


// iTAD
router.get("/test-itad", testITAD);
router.get("/test-precio", testPrecio);
router.get("/:id/ofertas", getOfertasJuego);

router.get('/', getGames);
router.get('/:id', getJuegoPorId);
module.exports = router;
