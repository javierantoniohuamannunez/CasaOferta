require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const gameRoutes = require("./routes/gameRoutes");
const ofertasRoutes = require("./routes/ofertasRoutes");

const notFound = require("../middlewares/notFound");
const handleErrors = require("../middlewares/handleErrors");

app.use(cors());
app.use(express.json());

app.use("/games", gameRoutes);
app.use("/ofertas", ofertasRoutes);

app.get("/", (request, response) => {
  response.send("api funcionando");
});

// middlewares
app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`servidor funcionando en el puerto ${PORT}`);
});
