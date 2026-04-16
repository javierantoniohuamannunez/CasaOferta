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
// se usa en hero no tocar
const obtenerJuegosTop = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: API_KEY,
        page_size: 20,
        ordering: "-added", //ordering: "-metacritic" mejor calificado
        parent_platforms:"1",
      },
    });

    return response.data.results.map((juego) => ({
      id: juego.id,
      nombre: juego.name,
      imagen: juego.background_image,
      rating: juego.rating,
      metacritic: juego.metacritic,
      plataformas: juego.parent_platforms.map((p) => p.platform.name) ,
    }));
  } catch (error) {
    console.log("Error RAWG:", error.message);
    return [];
  }
};

module.exports = { buscarGames, obtenerJuegoPorId, obtenerJuegosTop };
// modificar caso de uso, agregar mas modelos que me falta usuario evento, alerta, favorito, notificacion
