const axios = require("axios");

const API_URL = "https://api.isthereanydeal.com";
const API_KEY = process.env.ITAD_API_KEY;

const buscarJuego = async (nombre) => {
  const response = await axios.get(
    `${API_URL}/games/search/v1`,
    {
      params: {
        key: API_KEY,
        title: nombre,
        results: 5,
      },
    }
  );

  return response.data;
};

const obtenerOfertas = async (gameId) => {
  console.log("ID ENVIADO A ITAD:", gameId);

  const response = await axios.post(
    `${API_URL}/games/prices/v3`,
    [gameId],
    {
      params: {
        key: API_KEY,
        country: "US",

        // traer aunque no tengan descuento
        deals: false,

        // máximo tiendas
        capacity: 6,

        // tiendas importantes
        shops: "61,6,37,24,35",
      },

      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(
    "RESPUESTA PRECIOS:",
    JSON.stringify(response.data, null, 2)
  );

  return response.data;
};
module.exports = {
  buscarJuego,
  obtenerOfertas,
};