const { JuegoDestacado } = require("../models");
const { obtenerJuegosTop } = require("./rawgService");

const actualizarDestacados = async () => {
  try {
    const juegos = await obtenerJuegosTop();

    await JuegoDestacado.destroy({
      where: {},
      truncate: true,
    });

    const juegosFormateados = juegos
      .filter((juego) => juego?.id && juego?.nombre && juego?.imagen)
      .map((juego) => ({
        juegoId: juego.id,
        nombre: juego.nombre,
        imagen: juego.imagen,
        rating: juego.rating,
        metacritic: juego.metacritic,
        plataformas: juego.plataformas,
      }));

    if (juegosFormateados.length > 0) {
      await JuegoDestacado.bulkCreate(juegosFormateados);
    }

    console.log("Juegos destacados actualizados");
  } catch (error) {
    console.log("Error actualizando destacados", error.message);
  }
};

module.exports = {
  actualizarDestacados,
};
