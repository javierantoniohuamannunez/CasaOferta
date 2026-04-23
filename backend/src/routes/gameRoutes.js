const express = require('express');
const router = express.Router();

const { getGames, getGameById, getTopGames,getTopOfertas,getJuegosPorGenero ,getCategorias} = require('../controllers/gameController');

// GET game
router.get("/categorias", getCategorias);
router.get('/por-genero', getJuegosPorGenero);
router.get('/top-ofertas', getTopOfertas);
router.get('/top', getTopGames);
router.get('/', getGames);
router.get('/:id', getGameById);
module.exports = router;