const express = require('express');
const router = express.Router();

const { getBusquedaCompleta } = require('../controllers/busquedaController');

router.get('/', getBusquedaCompleta);

module.exports = router;