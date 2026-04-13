const axios = require("axios");

const API_KEY = process.env.RAWG_API_KEY;

// Buscar juegos
const buscarGames = async (query) => {
  const response = await axios.get("https://api.rawg.io/api/games", {
    params: {
      key: API_KEY,
      search: query,
    },
  });

  return response.data.results;
};
const obtenerJuegoPorId = async (id) => {
  const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
    params: {
      key: API_KEY,
    },
  });

  return response.data;
};

module.exports = { buscarGames, obtenerJuegoPorId };
// modificar caso de uso, agregar mas modelos que me falta usuario evento, alerta, favorito, notificacion