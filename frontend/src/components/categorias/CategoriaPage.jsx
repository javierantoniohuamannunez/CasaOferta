import "./categorias.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { obtenerJuegosPorGenero } from "../../services/api";

import ResultadosGenero from "../resultados/ResultadosGenero";

const CategoriaPage = () => {
  const { id } = useParams();

  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerJuegosPorGenero(id);

        setJuegos(data);
      } catch (error) {
        console.log(error);
      }
    };

    cargar();
  }, [id]);

  return (
    <div className="categoria-page">
      <ResultadosGenero juegos={juegos} />
    </div>
  );
};

export default CategoriaPage;