const cron = require("node-cron");
const {
  actualizarCategorias,
} = require("../services/cacheCategoriasService");

const iniciarCronCategorias = () => {
  cron.schedule("0 3 * * *", async () => {
    try {
      console.log("Actualizando categorias...");
      await actualizarCategorias();
    } catch (error) {
      console.log("Error cron categorias:", error.message);
    }
  });

  console.log("Cron de categorias iniciado");
};

module.exports = {
  iniciarCronCategorias,
};
