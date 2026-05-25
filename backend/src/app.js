require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const sequelize = require("./config/db");
const { iniciarCronOfertas } = require("./cron/updateOfertasCron");
const { iniciarCronCategorias } = require("./cron/updateCategoriasCron");
const { iniciarCronDestacados } = require("./cron/updateDestacadosCron");

const tiendasService = require("./services/tiendasService");
const { actualizarCategorias } = require("./services/cacheCategoriasService");
const { actualizarDestacados } = require("./services/cacheDestacadosService");
const notificacionesRoutes = require("./routes/notificacionesRoutes");

require("./models");
require("./cron/checkAlertasCron");

const gameRoutes = require("./routes/gameRoutes");
const tiendasRoutes = require("./routes/tiendasRoutes");
const favoritoRoutes = require("./routes/favoritosRoutes");
const authRoutes = require("./routes/authRoutes");
const alertasRoutes = require("./routes/alertasRoutes");

const notFound = require("../middlewares/notFound");
const handleErrors = require("../middlewares/handleErrors");

app.use("/notificaciones", notificacionesRoutes);

app.use(cors());
app.use(express.json());

app.use("/games", gameRoutes);
app.use("/api/tiendas", tiendasRoutes);
app.use("/favoritos", favoritoRoutes);
app.use("/alertas", alertasRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("api funcionando");
});

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("Base de datos conectada");
    console.log("Generando cache inicial...");

    await tiendasService.obtenerTiendas();
    await actualizarCategorias();
    await actualizarDestacados();

    console.log("Cache generada");
    iniciarCronOfertas();
    iniciarCronCategorias();
    iniciarCronDestacados();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor funcionando en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
