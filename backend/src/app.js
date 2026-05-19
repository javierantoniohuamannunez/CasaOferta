require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const sequelize = require("./config/db");

// modelos
// require("./models/Usuario");
// require("./models/Favorito");
require("./models");
// rutas
const gameRoutes = require("./routes/gameRoutes");
// const ofertasRoutes = require("./routes/ofertasRoutes");
const tiendasRoutes = require("./routes/tiendasRoutes");
const favoritoRoutes = require("./routes/favoritosRoutes");
const authRoutes = require("./routes/authRoutes");

// middlewares
const notFound = require("../middlewares/notFound");
const handleErrors = require("../middlewares/handleErrors");

app.use(cors());
app.use(express.json());

// rutas
app.use("/games", gameRoutes);
// app.use("/ofertas", ofertasRoutes);
app.use("/api/tiendas", tiendasRoutes);

app.use("/favoritos", favoritoRoutes);
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
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos conectada");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor funcionando en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
