const express = require('express');
const router = express.Router();

const { getGames } = require('../controllers/gameController');

// GET games
router.get('/', getGames);

module.exports = router;