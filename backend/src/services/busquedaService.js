const rawgService = require("../services/rawgService");
const ofertasService = require("../services/ofertasService");

//conbina datos de las ofertas con los juegos
const buscarCompleto = async (query) => {
  //buscar en rawg
  const juegos = await rawgService.buscarGames(query);
  if (!juegos || juegos.length === 0) {
    return [];
  }
  const juego = juegos[0];
  //buscar ofertas
  const ofertas = await ofertasService.buscarOfertas(juego.name);

  return {
    nombre: juego.name,
    imagen: juego.background_image,
    rating: juego.rating,
    ofertas: ofertas,
  };
};
module.exports = {
  buscarCompleto,
};
