const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error registrando usuario");
  }

  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error login");
  }

  // guardar token
  localStorage.setItem("token", data.token);

  return data;
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

  if (!response.ok) {
    throw new Error("Error agregando favorito");
  }

  return response.json();
};
