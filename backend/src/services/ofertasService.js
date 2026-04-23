const axios = require("axios");

const obtenerTopOfertas = async () => {
  try {
    const tiendas = ["1", "11", "2"]; // Steam, Humble, GMG

    const resultados = await Promise.all(
      tiendas.map(async (storeID) => {
        const response = await axios.get(
          "https://www.cheapshark.com/api/1.0/deals",
          {
            params: {
              storeID,
              pageSize: 10,
              sortBy: "Deal Rating",
              desc: 1,
            },
          }
        );

        return response.data.slice(0, 2).map((juego) => ({
          id: juego.dealID,
          nombre: juego.title,
          imagen: juego.thumb,
          precio: juego.salePrice,
          descuento: juego.savings,
          tienda: juego.storeID,
          metacritic: Number(juego.metacriticScore),
          rating :juego.steamRatingPercent,
        }));
      })
    );

    return resultados.flat();
  } catch (error) {
    console.log("Error ofertas:", error.message);
    return [];
  }
};
const buscarOfertas = async (nombre) => {
  try {
    const response = await axios.get(
      "https://www.cheapshark.com/api/1.0/deals",
      {
        params: {
          title: nombre,
          pageSize: 5,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error buscarOfertas:", error.message);
    return [];
  }
};

module.exports = {
  obtenerTopOfertas,
  buscarOfertas, 
};