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
  try {
    const response = await axios.get(`https://api.rawg.io/api/games/${id}`, {
      params: {
        key: API_KEY,
      },
    });
    const juego = response.data;
    return {
      id: juego.id,
      nombre: juego.name,
      imagen: juego.background_image,
      descripcion:
        juego.description_raw || juego.description || "Sin descripcion",
      rating: juego.rating,
      metacritic: juego.metacritic,
      generos: juego.genres
        ? juego.genres.map((g) => ({
            id: g.id,
            nombre: g.name,
          }))
        : [],
      plataformas: juego.platforms
        ? juego.platforms.map((p) => p.platform.name)
        : [],
      released: juego.released,
      website: juego.website,
    };
  } catch (error) {
    console.log("Error RAWG:", error.message);
    return null;
  }
};
// se usa en hero no tocar
const obtenerJuegosTop = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: API_KEY,
        page_size: 20,
        ordering: "-added", //ordering: "-metacritic" mejor calificado
        //parent_platforms:"1",
      },
    });
    if (!response.data.results.length) {
      console.log("RAWG vacío");
      return [];
    }
    return response.data.results.map((juego) => ({
      id: juego.id,
      nombre: juego.name,
      imagen: juego.background_image,
      rating: juego.rating,
      metacritic: juego.metacritic,
      plataformas: juego.parent_platforms.map((p) => p.platform.name),
    }));
  } catch (error) {
    console.log("Error RAWG:", error.message);
    return [];
  }
};
const obtenerCategorias = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/genres", {
      params: {
        key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log("Error RAWG:", error.message);
    return [];
  }
};
const obtenerJuegosParaOfertas = async () => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: API_KEY,
        page_size: 100,
        ordering: "-added",
        dates: "2020-01-01,2026-12-31",
      },
    });

    if (!response.data.results.length) {
      return [];
    }

    return response.data.results.map((juego) => ({
      id: juego.id,
      nombre: juego.name,
      imagen: juego.background_image,
      rating: juego.rating,
      metacritic: juego.metacritic || 0,
      plataformas: juego.parent_platforms?.map((p) => p.platform.name) || [],
    }));
  } catch (error) {
    console.log("Error RAWG:", error.message);

    return [];
  }
};
module.exports = {
  buscarGames,
  obtenerJuegoPorId,
  obtenerJuegosTop,
  obtenerJuegosPorGenero,
  obtenerCategorias,
  obtenerJuegosParaOfertas,
};
// modificar caso de uso, agregar mas modelos que me falta usuario evento, alerta, favorito, notificacion
