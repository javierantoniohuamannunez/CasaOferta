const rawgService = require("../services/rawgService");
const itadService = require("../services/itadService");
const { CategoriaHome, JuegoDestacado } = require("../models");
const {
  actualizarCategorias,
} = require("../services/cacheCategoriasService");
const {
  actualizarDestacados,
} = require("../services/cacheDestacadosService");

const respuestaSinOfertas = (juego) => ({
  juego: {
    id: juego.id,
    nombre: juego.nombre,
    imagen: juego.imagen,
    rating: juego.rating,
    metacritic: juego.metacritic,
    descripcion: juego.descripcion,
    plataformas: juego.plataformas || [],
    generos: juego.generos || [],
    released: juego.released,
    website: juego.website,
  },
  mejorOferta: null,
  totalOfertas: 0,
  ofertas: [],
  historialPrecios: [],
});

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
    let juegos = await JuegoDestacado.findAll({
      order: [["id", "ASC"]],
      limit: 20,
    });

    if (juegos.length === 0) {
      await actualizarDestacados();

      juegos = await JuegoDestacado.findAll({
        order: [["id", "ASC"]],
        limit: 20,
      });
    }

    const juegosConPrecio = await Promise.all(
      juegos.map(async (juego) => {
        const oferta = await itadService.obtenerMejorOfertaPorTitulo(
          juego.nombre,
        );

        return {
          id: juego.juegoId,
          nombre: juego.nombre,
          imagen: juego.imagen,
          rating: juego.rating,
          metacritic: juego.metacritic,
          plataformas: juego.plataformas || [],
          ...oferta,
        };
      }),
    );

    res.json(juegosConPrecio);
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
    let categorias = await CategoriaHome.findAll({
      order: [["id", "ASC"]],
      limit: 10,
    });

    if (categorias.length === 0) {
      await actualizarCategorias();

      categorias = await CategoriaHome.findAll({
        order: [["id", "ASC"]],
        limit: 10,
      });
    }

    const formateados = categorias.map((c) => ({
      id: c.id,
      nombre: c.nombre,
      slug: c.slug,
      imagen: c.imagen,
    }));

    res.json(formateados);
  } catch (error) {
    next(error);
  }
};

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

    if (!juego) {
      return res.status(404).json({
        ok: false,
        error: "Juego no encontrado",
      });
    }

    const resultadosITAD = await itadService.buscarJuego(juego.nombre);
    console.log("RESULTADOS ITAD:", JSON.stringify(resultadosITAD, null, 2));

    if (!resultadosITAD || resultadosITAD.length === 0) {
      return res.json(respuestaSinOfertas(juego));
    }

    const juegosFiltrados = resultadosITAD.filter(
      (j) => j.type === "game" || j.type === "package" || j.type === "bundle",
    );

    if (juegosFiltrados.length === 0) {
      return res.json(respuestaSinOfertas(juego));
    }

    const juegoITAD =
      juegosFiltrados.find((j) =>
        j.title.toLowerCase().includes(juego.nombre.toLowerCase()),
      ) || juegosFiltrados[0];

    console.log("JUEGO ITAD:", juegoITAD);

    if (!juegoITAD?.id) {
      return res.json(respuestaSinOfertas(juego));
    }

    const respuestaPrecios = await itadService.obtenerOfertas(juegoITAD.id);

    console.log(
      "RESPUESTA PRECIOS:",
      JSON.stringify(respuestaPrecios, null, 2),
    );

    const historial = await itadService.obtenerHistorialPrecio(juegoITAD.id);
    console.log("HISTORIAL:", historial);

    if (
      !respuestaPrecios ||
      !Array.isArray(respuestaPrecios) ||
      respuestaPrecios.length === 0
    ) {
      return res.json(respuestaSinOfertas(juego));
    }

    const dataJuego = respuestaPrecios[0];
    const ofertas = dataJuego?.deals || [];

    if (ofertas.length === 0) {
      return res.json(respuestaSinOfertas(juego));
    }

    const ofertasOrdenadas = ofertas.sort(
      (a, b) => a.price.amount - b.price.amount,
    );

    const ofertasLimpias = ofertasOrdenadas.map((oferta) => ({
      tienda: oferta.shop?.name,
      precioActual: oferta.price?.amount || 0,
      precioNormal: oferta.regular?.amount || 0,
      descuento: oferta.cut || 0,
      moneda: oferta.price?.currency || "USD",
      drm: oferta.drm?.map((d) => d.name) || [],
      plataformas: oferta.platforms?.map((p) => p.name) || [],
      url: oferta.url,
      expiracion: oferta.expiry || null,
      ahorro: (oferta.regular?.amount || 0) - (oferta.price?.amount || 0),
    }));

    const historialPrecios = historial.map((item) => ({
      fecha: item.timestamp,
      tienda: item.shop?.name || "Desconocida",
      precio: item.deal?.price?.amount || 0,
      precioRegular: item.deal?.regular?.amount || 0,
      descuento: item.deal?.cut || 0,
    }));

    return res.json({
      juego: {
        id: juego.id,
        nombre: juego.nombre,
        imagen: juego.imagen,
        rating: juego.rating,
        metacritic: juego.metacritic,
        descripcion: juego.descripcion,
        plataformas: juego.plataformas || [],
        generos: juego.generos || [],
        released: juego.released,
        website: juego.website,
      },
      mejorOferta: ofertasLimpias[0],
      totalOfertas: ofertasLimpias.length,
      ofertas: ofertasLimpias,
      historialPrecios,
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
  getJuegosPorGenero,
  getCategorias,
  testITAD,
  testPrecio,
  getOfertasJuego,
};
