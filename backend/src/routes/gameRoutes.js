const express = require('express');
const router = express.Router();

const { getGames, getGameById, getTopGames } = require('../controllers/gameController');

// GET games
router.get('/top', getTopGames);
router.get('/', getGames);
router.get('/:id', getGameById);
module.exports = router;