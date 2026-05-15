const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

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
    `${API_URL}/games/por-genero?genero=${generoId}`,
  );
  return response.json();
};

export const obtenerJuegoPorId = async (id) => {
  const response = await fetch(`${API_URL}/games/${id}`);
  return response.json();
};
export const obtenerJuegosTop = async () => {
  const response = await fetch(`${API_URL}/games/top`);
  return response.json();
};

///iTAD
export const obtenerOfertasJuego = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/games/${id}/ofertas`
    );

    return response.data;
  } catch (error) {
    console.log(error);

    return {
      mejorOferta: null,
      ofertas: [],
    };
  }
};
