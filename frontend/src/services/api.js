// Nota (2026-04-15): centralizo aquí las llamadas al backend usando `VITE_API_URL`
// para evitar URLs hardcodeadas en componentes.
const API_URL = import.meta.env.VITE_API_URL;

export const buscarJuegos = async (query) => {
  const response = await fetch(
    `${API_URL}/games?buscar=${encodeURIComponent(query)}`,
  );
  return response.json();
};

export const obtenerTopOfertas = async () => {
  const response = await fetch(`${API_URL}/games/top-ofertas`);
  return response.json();
};
