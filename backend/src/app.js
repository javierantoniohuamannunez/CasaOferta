require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const gameRoutes = require("./routes/gameRoutes");
const ofertasRoutes = require("./routes/ofertasRoutes");

const busquedaRoutes = require("./routes/busquedaRoutes");

const notFound = require("../middlewares/notFound");
const handleErrors = require("../middlewares/handleErrors");

const sequelize = require("./config/db");
const favoritoRoutes = require("./routes/favoritosRoutes");

app.use(cors());
app.use(express.json());

app.use("/games", gameRoutes);
app.use("/ofertas", ofertasRoutes);

app.use("/busqueda", busquedaRoutes);

app.use("/favoritos", favoritoRoutes);
app.get("/", (request, response) => {
  response.send("api funcionando");
});

// middlewares
app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => console.log("Base de datos conectada"))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`servidor funcionando en el puerto ${PORT}`);
});
