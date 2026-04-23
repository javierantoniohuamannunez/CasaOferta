
const API_URL = import.meta.env.VITE_API_URL;


export const buscarJuegos = async (query) => {
  const response = await fetch(
    `${API_URL}/games?buscar=${encodeURIComponent(query)}`,
  );
  return response.json();
};

export const obtenerTopOfertas = async () => {
  const response = await fetch(`${API_URL}/ofertas/top-ofertas`);
  return response.json();
};

export const obtenerCategorias = async () => {
  const response = await fetch(`${API_URL}/games/categorias`);
  return response.json();
};

export const obtenerJuegosPorGenero = async (generoId) => {
  const response = await fetch(
    `${API_URL}/games/por-genero?genero=${generoId}`
  );
  return response.json();
};