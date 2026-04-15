import { useEffect, useState } from "react";
import { buscarJuegos } from "../services/api";

const Destacados = () => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    // Nota (2026-04-15): el lint `react-hooks/set-state-in-effect` no permite
    // setState "sincrono" dentro del cuerpo del effect; lo dejamos dentro del
    // callback de la promesa.
    let cancelado = false;

    buscarJuegos("for")
      .then((data) => {
        if (cancelado) return;
        setJuegos((Array.isArray(data) ? data : []).slice(0, 8));
      })
      .catch((err) => console.log(err));

    return () => {
      cancelado = true;
    };
  }, []);
  return (
    <div className="destacados">
      {juegos.map((juego) => (
        <img key={juego.id} src={juego.background_image} alt={juego.name} />
      ))}
    </div>
  );
};
export default Destacados;
