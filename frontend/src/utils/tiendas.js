export const obtenerNombreTienda = (id) => {
  const tiendas = {
    "1": "Steam",
    "11": "Humble Store",
    "2": "GreenManGaming",
  };

  return tiendas[id];
};