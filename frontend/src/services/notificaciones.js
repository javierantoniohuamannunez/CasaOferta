import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/notificaciones`;


export const obtenerNotificaciones = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// marcar como leido
export const marcarLeida = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
