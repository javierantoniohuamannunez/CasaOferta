const { OfertaTienda } = require("../models");

const guardarTiendas = async (datos) => {
  try {
    // limpiar tabla
    await OfertaTienda.destroy({
      where: {},
      truncate: true,
    });
    // guardar nuevos datos
    await OfertaTienda.bulkCreate(datos);

    console.log(
      "Tiendas completas guardadas en DB",
    );
  } catch (error) {
    console.log(
      "Error guardando tiendas:",
      error.message,
    );
  }
};

module.exports = {
  guardarTiendas,
};