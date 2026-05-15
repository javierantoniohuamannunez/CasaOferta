const axios = require("axios");

const API_URL = "https://api.isthereanydeal.com";
const API_KEY = process.env.ITAD_API_KEY;

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

      // traer aunque no tengan descuento
      deals: false,

      // tiendas
      capacity: 6,

      // tiendas importantes
      shops: "61,6,37,24,35",
    },

    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("RESPUESTA PRECIOS:", JSON.stringify(response.data, null, 2));

  return response.data;
};

const obtenerHistorialPrecio = async (idJuego) => {
  try {
    const fecha = new Date();

    fecha.setMonth(fecha.getMonth() - 6);

    const since = fecha.toISOString().split(".")[0] + "Z";
    // console.log("idhistorial:", idJuego);
    // console.log("since:", since);
    const response = await axios.get(
      `${API_URL}/games/history/v2`,
      {
        params: {
          key: process.env.ITAD_API_KEY,
          id: idJuego,
          country: "US",
          shops: "61,37,6,20,35",
          since,
        },
      },
    );

    console.log("RESPUESTA HISTORIAL:", JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    console.log("ERROR HISTORIAL:", error.response?.data || error.message);

    return [];
  }
};
module.exports = {
  buscarJuego,
  obtenerOfertas,
  obtenerHistorialPrecio,
};
