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

module.exports = {buscarGames};
