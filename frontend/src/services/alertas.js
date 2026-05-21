const API_URL = import.meta.env.VITE_API_URL;

export const crearAlerta = async (
  datos,
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    API,
    datos,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};