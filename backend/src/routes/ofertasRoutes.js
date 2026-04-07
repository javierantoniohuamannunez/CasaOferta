const express = require('express');
const router = express.Router();

const { getOfertas } = require('../controllers/ofertasController');

// GET ofertas
router.get('/', getOfertas);

module.exports = router;