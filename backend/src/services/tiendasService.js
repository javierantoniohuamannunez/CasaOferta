const rawgService = require("./rawgService");
const itadService = require("./itadService");

const { guardarOfertas } = require("./cacheTiendasService");
const obtenerTiendas = async () => {
  try {
    const tiendasObjetivo = [
      { id: 61, nombre: "Steam" },
      { id: 6, nombre: "Fanatical" },
      { id: 37, nombre: "Humble Store" },
      { id: 35, nombre: "GOG" },
      { id: 24, nombre: "GamersGate" },
    ];

    const juegosRawg = await rawgService.obtenerJuegosParaOfertas();

    const resultadoFinal = [];

    for (const tienda of tiendasObjetivo) {
      const juegosPorTienda = [];

      for (const juego of juegosRawg.slice(0, 150)) {
        try {
          const resultadosITAD = await itadService.buscarJuego(juego.nombre);

          if (!resultadosITAD || resultadosITAD.length === 0) {
            continue;
          }
          const juegoITAD = resultadosITAD.find(
            (j) => j.type === "game" || j.type === "package",
          );
          if (!juegoITAD) {
            continue;
          }
          const precios = await itadService.obtenerOfertas(juegoITAD.id);
          if (!precios || !precios[0]) {
            continue;
          }
          const deals = precios[0].deals || [];
          const deal = deals.find((d) => d.shop.id === tienda.id && d.cut > 15);

          if (!deal) {
            continue;
          }
          const descuento = deal.cut || 0;
          const metacritic = juego.metacritic || 0;
          const score = descuento + metacritic / 4;
          juegosPorTienda.push({
            id: juego.id,
            nombre: juego.nombre,
            imagen: juego.imagen,
            precioActual: deal.price.amount,
            precioNormal: deal.regular.amount,
            descuento,
            metacritic,
            tiendaId: tienda.id,
            tienda: deal.shop.name,
            url: deal.url,
            score,
          });

          // 3 juegos por tienda
          if (juegosPorTienda.length >= 3) {
            break;
          }
        } catch (error) {
          continue;
        }
      }
      resultadoFinal.push({
        tiendaId: tienda.id,
        tienda: tienda.nombre,
        juegos: juegosPorTienda.sort((a, b) => b.score - a.score),
      });
    }
    // guardado en MySQL
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
    await guardarOfertas(ofertasPlanas);
    return resultadoFinal;
  } catch (error) {
    console.log("Error tiendas:", error.message);
    return [];
  }
};

module.exports = {
  obtenerTiendas,
};
