const API_URL = import.meta.env.VITE_API_URL;

//buscar juegos
export const buscarJuegos= async (query) => {
    const response = await fetch(`${API_URL}/games?buscar=${query}`);
  return response.json();
}