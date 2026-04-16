export const obtenerNombreTienda = (id) => {
  const tiendas = {
    "1": "Steam",
    "25": "Epic Games",
    "8": "Origin",
    "13": "Ubisoft",
  };

  return tiendas[id];
};