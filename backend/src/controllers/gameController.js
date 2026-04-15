const rawgService = require("../services/rawgService");
const ofertasService = require("../services/ofertasService");

// obtiene la lista de juegos por busqueda
const getGames = async (req, res, next) => {
  try {
    const { buscar } = req.query;

    if (!buscar) {
      return res.status(400).json({
        ok: false,
        error: "Falta el parametro 'buscar'",
      });
    }
    const games = await rawgService.buscarGames(buscar);

    res.json(games);
  } catch (error) {
    next(error);
  }
};
// Obtener detalle de juego
const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const juego = await rawgService.obtenerJuegoPorId(id);

    res.json({
      nombre: juego.name,
      descripcion: juego.description_raw,
      imagen: juego.background_image,
      rating: juego.rating,
      generos: juego.genres.map((g) => g.name),
    });
  } catch (error) {
    next(error);
  }
};
const getTopGames = async (req, res, next) => {
  try {
    const juegos = await rawgService.obtenerJuegosTop();
    res.json(juegos);
  } catch (error) {
    next(error);
  }
};

const getTopOfertas = async (req, res, next) => {
  try {
    const juegos = await rawgService.obtenerJuegosTop();

    const resultado = [];

    for (const juego of juegos.slice(0, 5)) {
      try {
        const ofertas = await ofertasService.buscarOfertas(juego.nombre);

        let mejor = null;

        if (ofertas && ofertas.length > 0) {
          mejor = ofertas.sort(
            (a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice)
          )[0];
        }

        resultado.push({
          id: juego.id,
          nombre: juego.nombre,
          imagen: juego.imagen,
          metacritic: juego.metacritic,
          precio: mejor ? mejor.salePrice : null,
          descuento: mejor ? Math.round(parseFloat(mejor.savings)) : 0,
          tienda: mejor ? mejor.storeID : null,
        });

      } catch (error) {
        console.log("error precio:", error.message);

        resultado.push({
          id: juego.id,
          nombre: juego.nombre,
          imagen: juego.imagen,
          metacritic: juego.metacritic,
          precio: null,
          descuento: 0,
          tienda: null,
        });
      }
      await new Promise(res => setTimeout(res, 500));
    }

    res.json(resultado);

  } catch (error) {
    next(error);
  }
};
module.exports = { getGames, getGameById, getTopGames, getTopOfertas };
