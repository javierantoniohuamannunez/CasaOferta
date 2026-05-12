const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};
export const obtenerFavoritos = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/favoritos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error obteniendo favoritos");
  }

  return response.json();
};
export const agregarFavorito = async (juego) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/favoritos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(juego),
  });

  return response.json();
};
