const express = require('express');
const router = express.Router();

const { getTopOfertas } = require('../controllers/ofertasController');

// GET ofertas
router.get("/top-ofertas", getTopOfertas);


module.exports = router;