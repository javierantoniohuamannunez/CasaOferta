const cron = require("node-cron");
const {
  actualizarDestacados,
} = require("../services/cacheDestacadosService");

const iniciarCronDestacados = () => {
  cron.schedule("0 3 * * *", async () => {
    try {
      console.log("Actualizando juegos destacados...");
      await actualizarDestacados();
    } catch (error) {
      console.log("Error cron destacados:", error.message);
    }
  });

  console.log("Cron de destacados iniciado");
};

module.exports = {
  iniciarCronDestacados,
};
