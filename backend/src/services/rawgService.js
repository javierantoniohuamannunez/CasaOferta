const axios = require("axios");

const API_KEY = process.env.RAWG_API_KEY;

const filtrarJuegos = (juegos) => {
  return juegos.filter((juego) => {
    return (
      juego.background_image &&
      juego.metacritic !== null &&
      juego.metacritic > 50 &&
      !juego.name.toLowerCase().includes("demo") &&
      !juego.name.toLowerCase().includes("fan") &&
      !juego.name.toLowerCase().includes("test")
    );
  });
};
//categorias
const obtenerJuegosPorGenero = async (generoId) => {
  const response = await axios.get("https://api.rawg.io/api/games", {
    params: {
      key: API_KEY,
      genres: generoId,
      page_size: 12,
    },
  });

  return response.data.results;
};
// Buscar juegos
const buscarGames = async (query) => {
  const response = await axios.get("https://api.rawg.io/api/games", {
    params: {
      key: API_KEY,
      search: query,
      search_precise: true, 
      page_size: 20,
      ordering: "-metacritic", 
    },
  });

  let juegos = response.data.results;

  juegos = filtrarJuegos(juegos);

  return juegos;
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
const obtenerCategorias = async () => {
  const response = await axios.get("https://api.rawg.io/api/genres", {
    params: {
      key: API_KEY,
    },
  });

  return response.data.results;
};
module.exports = { buscarGames, obtenerJuegoPorId, obtenerJuegosTop, obtenerJuegosPorGenero ,obtenerCategorias};
// modificar caso de uso, agregar mas modelos que me falta usuario evento, alerta, favorito, notificacion
