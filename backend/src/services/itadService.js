const axios = require("axios");

const API_URL = "https://api.isthereanydeal.com";
const API_KEY = process.env.ITAD_API_KEY;

const respuestaSinPrecio = () => ({
  precioActual: null,
  precioNormal: null,
  descuento: 0,
  moneda: "USD",
  tienda: null,
  url: null,
});

const normalizarTitulo = (texto = "") =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const buscarJuego = async (nombre) => {
  const response = await axios.get(`${API_URL}/games/search/v1`, {
    params: {
      key: API_KEY,
      title: nombre,
      results: 5,
    },
  });

  return response.data;
};

const obtenerOfertas = async (idJuego) => {
  console.log("ID ENVIADO A ITAD:", idJuego);

  const response = await axios.post(`${API_URL}/games/prices/v3`, [idJuego], {
    params: {
      key: API_KEY,
      country: "US",
      deals: false,
      capacity: 6,
      shops: "61,6,37,24,35",
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("RESPUESTA PRECIOS:", JSON.stringify(response.data, null, 2));
  return response.data;
};

const obtenerMejorOfertaPorTitulo = async (nombre) => {
  try {
    const resultados = await buscarJuego(nombre);

    if (!Array.isArray(resultados) || resultados.length === 0) {
      return respuestaSinPrecio();
    }

    const nombreNormalizado = normalizarTitulo(nombre);
    const juegosFiltrados = resultados.filter(
      (juego) =>
        juego?.id &&
        ["game", "package", "bundle"].includes(juego.type) &&
        juego.title,
    );

    if (juegosFiltrados.length === 0) {
      return respuestaSinPrecio();
    }

    const juegoITAD =
      juegosFiltrados.find(
        (juego) => normalizarTitulo(juego.title) === nombreNormalizado,
      ) ||
      juegosFiltrados.find((juego) =>
        normalizarTitulo(juego.title).includes(nombreNormalizado),
      ) ||
      juegosFiltrados[0];

    const respuestaPrecios = await obtenerOfertas(juegoITAD.id);
    const deals = Array.isArray(respuestaPrecios?.[0]?.deals)
      ? respuestaPrecios[0].deals
      : [];

    if (deals.length === 0) {
      return respuestaSinPrecio();
    }

    const mejorOferta = deals.reduce((mejor, actual) => {
      const mejorPrecio = mejor?.price?.amount ?? Number.POSITIVE_INFINITY;
      const actualPrecio = actual?.price?.amount ?? Number.POSITIVE_INFINITY;

      return actualPrecio < mejorPrecio ? actual : mejor;
    }, null);

    if (mejorOferta?.price?.amount == null) {
      return respuestaSinPrecio();
    }

    return {
      precioActual: mejorOferta.price.amount,
      precioNormal: mejorOferta.regular?.amount ?? mejorOferta.price.amount,
      descuento: mejorOferta.cut ?? 0,
      moneda: mejorOferta.price.currency ?? "USD",
      tienda: mejorOferta.shop?.name ?? null,
      url: mejorOferta.url ?? null,
    };
  } catch (error) {
    console.log(
      `Error obteniendo mejor oferta para ${nombre}:`,
      error.response?.data || error.message,
    );

    return respuestaSinPrecio();
  }
};

const obtenerHistorialPrecio = async (idJuego) => {
  try {
    const fecha = new Date();

    fecha.setMonth(fecha.getMonth() - 6);

    const since = fecha.toISOString().split(".")[0] + "Z";

    const response = await axios.get(`${API_URL}/games/history/v2`, {
      params: {
        key: process.env.ITAD_API_KEY,
        id: idJuego,
        country: "US",
        shops: "61,37,6,20,35",
        since,
      },
    });

    console.log("RESPUESTA HISTORIAL:", JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    console.log("ERROR HISTORIAL:", error.response?.data || error.message);

    return [];
  }
};

const obtenerDealsTienda = async (shopId) => {
  try {
    const response = await axios.get(`${API_URL}/deals/v2`, {
      params: {
        key: API_KEY,
        shops: String(shopId),
        limit: 100,
        offset: 0,
        country: "US",
        sort: "-trending",
      },
    });

    console.log("RESPUESTA TIENDA:", JSON.stringify(response.data, null, 2));

    const deals = response.data?.list || [];

    const juegosFiltrados = deals.filter((juego) => {
      const titulo = juego.title?.toLowerCase() || "";

      const bloqueados = [
        "soundtrack",
        "dlc",
        "demo",
        "beta",
        "editor",
        "pack",
        "bundle",
        "skin",
      ];

      const basura = bloqueados.some((p) => titulo.includes(p));
      return juego.deal?.price?.amount > 1 && juego.deal?.cut > 15 && !basura;
    });

    return juegosFiltrados;
  } catch (error) {
    console.log(
      "Error obteniendo deals tienda:",
      error.response?.data || error.message,
    );

    return [];
  }
};

module.exports = {
  buscarJuego,
  obtenerOfertas,
  obtenerMejorOfertaPorTitulo,
  obtenerHistorialPrecio,
  obtenerDealsTienda,
};
