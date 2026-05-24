const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export const buscarJuegos = async (query) => {
  const response = await fetch(
    `${API_URL}/games?buscar=${encodeURIComponent(query)}`,
  );

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

export const obtenerOfertasJuego = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/games/${id}/ofertas`);

    return response.data;
  } catch (error) {
    console.log(error);

    return {
      mejorOferta: null,
      ofertas: [],
    };
  }
};

export const obtenerTiendas = async () => {
  const response = await axios.get(`${API_URL}/api/tiendas/home`);

  return response.data;
};

export const obtenerTiendaPorId = async (id) => {
  const response = await axios.get(`${API_URL}/api/tiendas/${id}`);

  return response.data;
};

export const obtenerDetalleOferta = async (tiendaId, juegoId) => {
  const response = await axios.get(
    `${API_URL}/api/tiendas/${tiendaId}/ofertas/${juegoId}`,
  );

  return response.data;
};
