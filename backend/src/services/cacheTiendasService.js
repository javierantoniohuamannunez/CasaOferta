const { OfertaHome } = require("../models");

const guardarOfertas = async (ofertas) => {
  try {
    // limpiar tabla
    await OfertaHome.destroy({
      where: {},
      truncate: true,
    });

    // guardar nuevas ofertas
    await OfertaHome.bulkCreate(ofertas);

    console.log("Ofertas guardadas en DB");
  } catch (error) {
    console.log(
      "Error guardando ofertas:",
      error.message,
    );
  }
};

module.exports = {
  guardarOfertas,
};