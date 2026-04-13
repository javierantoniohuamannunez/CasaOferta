import { useEffect, useState } from "react";
import { buscarJuegos } from "../services/api";

const Destacados = () => {
  const [juegos, setJuegos] = useState([]);
  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const data = await buscarJuegos("for");
    setJuegos(data.slice(0, 8));
  };
  return (
    <div className="destacados">
      {juegos.map((juego) => (
        <img key={juego.id} src={juego.background_image} alt={juego.name} />
      ))}
    </div>
  );
};
export default Destacados;
