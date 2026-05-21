const rawgService = require("./rawgService");
const itadService = require("./itadService");

const { guardarOfertas } = require("./cacheTiendasService");
const { guardarTiendas } = require("./cacheTiendasCompletoService");

const obtenerTiendas = async () => {
  try {
    const tiendasObjetivo = [
      { id: 61, nombre: "Steam" },
      { id: 6, nombre: "Fanatical" },
      { id: 37, nombre: "Humble Store" },
      { id: 35, nombre: "GOG" },
      { id: 24, nombre: "GamersGate" },
      { id: 20, nombre: "GreenManGaming" },
    ];

    const resultadoFinal = [];
    const todasLasOfertas = [];

    for (const tienda of tiendasObjetivo) {
      console.log(`Cargando tienda ${tienda.nombre}...`);

      // deals directos desde ITAD
      const deals = await itadService.obtenerDealsTienda(tienda.id);
      if (!deals.length) {
        continue;
      }

      const juegosFormateados = deals.map((deal) => {
        const descuento = deal.deal?.cut || 0;

        const score = descuento;

        const juego = {
          juegoId: deal.id,
          nombre: deal.title,
          imagen: deal.assets?.boxart || deal.assets?.banner || "",
          precioActual: deal.deal?.price?.amount || 0,
          precioNormal: deal.deal?.regular?.amount || 0,
          descuento,
          metacritic: deal.reviews?.score || 0,
          tiendaId: tienda.id,
          tienda: tienda.nombre,
          url: deal.deal?.url || "",
          score,
        };

        return juego;
      });

      // guardar las ofertas
      todasLasOfertas.push(...juegosFormateados);

      resultadoFinal.push({
        tiendaId: tienda.id,
        tienda: tienda.nombre,

        juegos: juegosFormateados
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((juego) => ({
            id: juego.juegoId,
            nombre: juego.nombre,
            imagen: juego.imagen,
            precioActual: juego.precioActual,
            precioNormal: juego.precioNormal,
            descuento: juego.descuento,
            metacritic: juego.metacritic,
            tiendaId: juego.tiendaId,
            tienda: juego.tienda,
            url: juego.url,
            score: juego.score,
          })),
      });
    }

    const ofertasPlanas = resultadoFinal.flatMap((tienda) =>
      tienda.juegos.map((juego) => ({
        juegoId: juego.id,
        nombre: juego.nombre,
        imagen: juego.imagen,
        tiendaId: tienda.tiendaId,
        tienda: tienda.tienda,
        precioActual: juego.precioActual,
        precioNormal: juego.precioNormal,
        descuento: juego.descuento,
        metacritic: juego.metacritic,
        score: juego.score || 0,
        url: juego.url,
      })),
    );

    // guardar ofertas
    await guardarOfertas(ofertasPlanas);

    // guardar tiendas
    await guardarTiendas(todasLasOfertas);

    console.log("Cache de tiendas completada");

    return resultadoFinal;
  } catch (error) {
    console.log("Error tiendas:", error.message);

    return [];
  }
};

module.exports = {
  obtenerTiendas,
};
