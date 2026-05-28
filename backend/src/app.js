require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const sequelize = require("./config/db");
const { iniciarCronOfertas } = require("./cron/updateOfertasCron");
const { iniciarCronCategorias } = require("./cron/updateCategoriasCron");
const { iniciarCronDestacados } = require("./cron/updateDestacadosCron");

// cache BD ofertas
const tiendasService = require("./services/tiendasService");
const { actualizarCategorias } = require("./services/cacheCategoriasService");
const { actualizarDestacados } = require("./services/cacheDestacadosService");
const notificacionesRoutes = require("./routes/notificacionesRoutes");
// modelos
// require("./models/Usuario");
// require("./models/Favorito");
require("./models");
require("./cron/checkAlertasCron");

// rutas
const gameRoutes = require("./routes/gameRoutes");
// const ofertasRoutes = require("./routes/ofertasRoutes");
const tiendasRoutes = require("./routes/tiendasRoutes");
const favoritoRoutes = require("./routes/favoritosRoutes");
const authRoutes = require("./routes/authRoutes");
const alertasRoutes = require("./routes/alertasRoutes");

//test

// middlewares
const notFound = require("../middlewares/notFound");
const handleErrors = require("../middlewares/handleErrors");
//notificaciones
app.use("/notificaciones", notificacionesRoutes);

app.use(cors());
app.use(express.json());

// rutas
app.use("/games", gameRoutes);
// app.use("/ofertas", ofertasRoutes);
app.use("/api/tiendas", tiendasRoutes);

app.use("/favoritos", favoritoRoutes);
app.use("/alertas", alertasRoutes);

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("api funcionando");
});

// ERRORES
app.use(notFound);
app.use(handleErrors);

// prender servidor y db sequelize.sync()
const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: true })
  .then(async () => {
    console.log("Base de datos conectada");

    // generar cache completa
    console.log("Generando cache inicial...");

    await tiendasService.obtenerTiendas();
    await actualizarCategorias();
    await actualizarDestacados();

    console.log("Cache generada");
    //limitarllamadasAPIS;

    iniciarCronOfertas();
    iniciarCronCategorias();
    iniciarCronDestacados();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor funcionando en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
