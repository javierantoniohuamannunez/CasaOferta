import { useEffect, useState } from "react";
import GridJuegos from "../juegos/GridJuegos";

const Resultados = ({ busqueda }) => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    if (!busqueda) return;

    fetch(`http://localhost:3000/games?buscar=${busqueda}`)
      .then((res) => res.json())
      .then((data) => setJuegos(data))
      .catch((error) => {
        console.error("Error al buscar juegos:", error);
        setJuegos([]);
      });
  }, [busqueda]);

  const juegosFormateados = juegos.map((j) => ({
    id: j.id,
    nombre: j.name,
    imagen: j.background_image || "https://via.placeholder.com/300x150", // fallback
    metacritic: j.metacritic ?? 0,
    plataformas: j.platforms
      ? j.platforms.map((p) => p.platform.name)
      : [],
  }));

  return (
    <div>
      <h2 className="titulo-seccion">
        Resultados para: {busqueda}
      </h2>

      {juegos.length === 0 ? (
        <p style={{ padding: "20px" }}>No hay resultados</p>
      ) : (
        <GridJuegos juegos={juegosFormateados} />
      )}
    </div>
  );
};

export default Resultados;