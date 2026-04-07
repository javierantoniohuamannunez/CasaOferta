const axios = require("axios");

// Buscar ofertas de videojuegos
const buscarOfertas = async (query) => {
  const response = await axios.get("https://www.cheapshark.com/api/1.0/deals", {
    params: {
      title: query,
      pageSize: 10,
    },
  });

  return response.data;
};

module.exports = {
  buscarOfertas,
};
