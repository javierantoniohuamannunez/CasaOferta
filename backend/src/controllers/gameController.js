const rawgService = require("../services/rawgService");
const ofertasService = require("../services/ofertasService");
const itadService = require("../services/itadService");
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
const getJuegoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const juego = await rawgService.obtenerJuegoPorId(id);

    res.json(juego);
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

    for (const juego of juegos.slice(0, 10)) {
      try {
        const ofertas = await ofertasService.buscarOfertas(juego.nombre);

        let mejor = null;

        if (ofertas && ofertas.length > 0) {
          mejor = ofertas.sort(
            (a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice),
          )[0];
        }

        if (!mejor) continue;

        resultado.push({
          id: juego.id,
          nombre: juego.nombre,
          imagen: juego.imagen,
          metacritic: juego.metacritic,
          precio: mejor.salePrice,
          descuento: Math.round(parseFloat(mejor.savings)),
          tienda: mejor.storeID,
        });
      } catch (error) {
        console.log("error precio:", error.message);
      }

      // evitar ban
      await new Promise((res) => setTimeout(res, 500));
    }

    res.json(resultado);
  } catch (error) {
    next(error);
  }
};
const getJuegosPorGenero = async (req, res, next) => {
  try {
    const { genero } = req.query;
    const juegos = await rawgService.obtenerJuegosPorGenero(genero);
    const formateados = juegos.map((j) => ({
      id: j.id,
      nombre: j.name,
      imagen: j.background_image,
      metacritic: j.metacritic ?? 0,
      plataformas: j.platforms ? j.platforms.map((p) => p.platform.name) : [],
    }));

    res.json(formateados);
  } catch (error) {
    next(error);
  }
};
const getCategorias = async (req, res, next) => {
  try {
    const categorias = await rawgService.obtenerCategorias();
    const formateados = categorias.slice(0, 10).map((c) => ({
      id: c.id,
      nombre: c.name,
      imagen: c.image_background,
    }));
    res.json(formateados);
  } catch (error) {
    next(error);
  }
};

// itadService ///

const testITAD = async (req, res) => {
  try {
    const data = await itadService.buscarJuego("The Witcher 3");

    console.log(data);

    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const testPrecio = async (req, res) => {
  try {
    const juegos = await itadService.buscarJuego("The Witcher 3");
    const juego = juegos[0];
    const precio = await itadService.obtenerOfertas(juego.id);
    res.json(precio);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};
const getOfertasJuego = async (req, res) => {
  try {
    const { id } = req.params;
    const juego = await rawgService.obtenerJuegoPorId(id);
    const resultadosITAD = await itadService.buscarJuego(juego.nombre);

    if (!resultadosITAD.length) {
      return res.json({
        juego,
        mejorOferta: null,
        ofertas: [],
      });
    }

    const juegosFiltrados = resultadosITAD.filter((j) => j.type === "game");

    const juegoITAD =
      juegosFiltrados.find(
        (j) => j.title.toLowerCase() === juego.nombre.toLowerCase(),
      ) || juegosFiltrados[0];

    const respuestaPrecios = await itadService.obtenerOfertas(juegoITAD.id);

    const dataJuego = respuestaPrecios[0];

    const ofertas = dataJuego?.deals || [];

    if (!ofertas.length) {
      return res.json({
        juego: {
          id: juego.id,
          nombre: juego.nombre,
          imagen: juego.imagen,
        },

        mejorOferta: null,
        ofertas: [],
      });
    }

    const ofertasOrdenadas = ofertas.sort(
      (a, b) => a.price.amount - b.price.amount,
    );

    const mejorOferta = ofertasOrdenadas[0];

    const ofertasLimpias = ofertasOrdenadas.map((oferta) => ({
      tienda: oferta.shop.name,
      precioActual: oferta.price.amount,
      precioNormal: oferta.regular.amount,
      descuento: oferta.cut,
      moneda: oferta.price.currency,
      drm: oferta.drm,
      plataformas: oferta.platforms,
      url: oferta.url,
      expiracion: oferta.expiry,
    }));

    return res.json({
      juego: {
        id: juego.id,
        nombre: juego.nombre,
        imagen: juego.imagen,
        rating: juego.rating,
        metacritic: juego.metacritic,
      },

      mejorOferta: ofertasLimpias[0],
      totalOfertas: ofertasLimpias.length,
      ofertas: ofertasLimpias,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    return res.status(500).json({
      ok: false,
      error: "Error obteniendo ofertas",
    });
  }
};
module.exports = {
  getGames,
  getJuegoPorId,
  getTopGames,
  getTopOfertas,
  getJuegosPorGenero,
  getCategorias,
  testITAD,
  testPrecio,
  getOfertasJuego,
};
