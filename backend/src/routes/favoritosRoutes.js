const express= require ('express');
const router = express.Router();

const {
    obtenerFavoritos,
    crearFavorito,
    eliminarFavorito
} = require('../controllers/favoritosController');

// get favoritos
router.get('/', obtenerFavoritos);

// post favoritos
router.post('/', crearFavorito);

// delete favoritos
router.delete('/:id', eliminarFavorito);

module.exports = router;