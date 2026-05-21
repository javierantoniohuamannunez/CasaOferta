const cron = require("node-cron");

const tiendasService = require("../services/tiendasService");

const iniciarCronOfertas = () => {
  cron.schedule("0 3 * * *", async () => {
    try {
      console.log("Actualizando ofertas...");

      await tiendasService.obtenerTiendas();

      console.log("Ofertas actualizadas");
    } catch (error) {
      console.log("Error cron ofertas:", error.message);
    }
  });

  console.log("Cron de ofertas iniciado");
};

module.exports = {
  iniciarCronOfertas,
};