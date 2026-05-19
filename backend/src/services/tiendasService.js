const rawgService = require("./rawgService");
const itadService = require("./itadService");

const tiendasPrincipales = [
  "steam",
  "Humble",
  "GreenManGaming",
  "Fanatical",
  "GOG",
];

const obtenerTiendasHome = async () => {
  try {
    // TOP JUEGOS RAWG
    const juegosRAWG = await rawgService.obtenerJuegosTop();

    // limitar
    const juegosLimitados = juegosRAWG.slice(0, 12);

    // estructura
    const tiendasMap = {};

    tiendasObjetivo.forEach((tienda) => {
      tiendasMap[tienda] = [];
    });

    // recorrer juegos
    for (const juego of juegosLimitados) {
      try {
        const resultadosITAD = await itadService.buscarJuego(juego.nombre);

        if (!resultadosITAD || resultadosITAD.length === 0) {
          continue;
        }

        // evitar dlcs
        const juegoITAD = resultadosITAD.find(
          (j) => j.type === "game" || j.type === "package",
        );

        if (!juegoITAD?.id) {
          continue;
        }
        // ofertas
        const precios = await itadService.obtenerOfertas(juegoITAD.id);

        if (!precios || !precios.length) {
          continue;
        }
        const deals = precios[0]?.deals || [];
        deals.forEach((deal) => {
          const tienda = deal.shop?.name;
          if (!tiendasObjetivo.includes(tienda)) {
            return;
          }
          // maximo 3 juegos
          if (tiendasMap[tienda].length >= 3) {
            return;
          }
          tiendasMap[tienda].push({
            id: juego.id,
            nombre: juego.nombre,
            imagen: juego.imagen,
            precioActual: deal.price?.amount,
            precioNormal: deal.regular?.amount,
            descuento: deal.cut,
            metacritic: juego.metacritic,
            tienda,
            url: deal.url,
          });
        });
      } catch (error) {
        console.log("Error juego:", juego.nombre);
      }
    }
    return Object.entries(tiendasMap).map(([tienda, juegos]) => ({
      tienda,
      juegos,
    }));
  } catch (error) {
    console.log("Error tiendas:", error.message);

    return [];
  }
};

module.exports = {
  obtenerTiendasHome,
};
