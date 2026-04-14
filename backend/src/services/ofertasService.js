const axios = require("axios");

// Buscar ofertas de videojuegos

const obtenerOfertas = async () => {
  const response = await axios.get("https://www.cheapshark.com/api/1.0/deals", {
    params: {
      pageSize: 20,
      sortBy: "Savings",
      desc: 1,
    },
    headers: {
      "User-Agent": "MiAppComparadorJuegos/1.0",
    },
  });

  return response.data;
};
const buscarOfertas = async (nombre) => {
  const response = await axios.get("https://www.cheapshark.com/api/1.0/deals", {
    params: {
      title: nombre,
      pageSize: 5,
    },
    headers: {
      "User-Agent": "MiAppComparadorJuegos/1.0",
    },
  });
  return response.data;
};
module.exports = {obtenerOfertas,buscarOfertas};