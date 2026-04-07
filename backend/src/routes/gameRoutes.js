const express = require('express');
const router = express.Router();

const { getGames, getGameById } = require('../controllers/gameController');

// GET games
router.get('/', getGames);
router.get('/:id', getGameById);

module.exports = router;