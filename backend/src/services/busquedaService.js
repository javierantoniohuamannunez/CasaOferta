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
  const ofertasRaw = await ofertasService.buscarOfertas(juego.name);

  // Filtrar y limpiar datos
  const ofertas = ofertasRaw.slice(0, 5).map((oferta) => ({
    titulo: oferta.title,
    precio: oferta.salePrice,
    precioOriginal: oferta.normalPrice,
    descuento: Math.round(oferta.savings) + "%",
    tienda: oferta.storeID,
  }));
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
