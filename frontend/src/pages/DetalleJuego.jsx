import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerJuegoPorId } from "../services/api";

const DetalleJuego = () => {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerJuegoPorId(id);
      setJuego(data);
    };

    cargar();
  }, [id]);

  if (!juego) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="detalle-juego">
      <img src={juego.imagen} alt={juego.nombre} />

      <h1>{juego.nombre}</h1>

      <p>{juego.descripcion}</p>

      <p> Rating: {juego.rating}</p>

      <p> Metacritic: {juego.metacritic}</p>

      <p> Géneros: {juego.generos.join(", ")}</p>
    </div>
  );
};

export default DetalleJuego;
