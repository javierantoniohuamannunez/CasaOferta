import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/alertas`;

export const crearAlerta = async (datos) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, datos, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const obtenerAlertas = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const eliminarAlerta = async (juegoId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${juegoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
