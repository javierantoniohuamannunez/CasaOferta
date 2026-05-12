const API_URL = import.meta.env.VITE_API_URL;

export const agregarFavorito = async (juegoId) => {

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/favoritos`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      juegoId,
    }),
  });

  return response.json();
};

export const eliminarFavorito = async (juegoId) => {

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/favoritos/${juegoId}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const obtenerFavorito = async () => {

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/favoritos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};