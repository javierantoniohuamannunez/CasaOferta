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

const obtenerJuegosTop = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: API_KEY,
        page_size: 20,
        ordering: "-metacritic",
        metacritic: "80,100",
        parent_platforms: "1", 
      },
    });

    return response.data.results
      .filter((juego) => juego.background_image) 
      .map((juego) => ({
        id: juego.id,
        nombre: juego.name,
        imagen: juego.background_image,
        rating: juego.rating,
        metacritic: juego.metacritic,
      }));

  } catch (error) {
    console.log("🔥 ERROR RAWG:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = { buscarGames, obtenerJuegoPorId, obtenerJuegosTop };
// modificar caso de uso, agregar mas modelos que me falta usuario evento, alerta, favorito, notificacion
