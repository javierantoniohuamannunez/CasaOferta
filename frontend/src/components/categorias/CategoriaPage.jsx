import "./categorias.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { obtenerJuegosPorGenero } from "../../services/api";

import ResultadosGenero from "../resultados/ResultadosGenero";

const CategoriaPage = () => {
  const { id } = useParams();

  // const navigate = useNavigate();

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
      <div className="categoria-hero">
        <h1 className="categoria-title">Explora nuevos videojuegos</h1>
     
      </div>
      {/* <button className="btn-volver" onClick={() => navigate(-1)}>
        ← Volver
      </button> */}
      <ResultadosGenero juegos={juegos} />
    </div>
  );
};

export default CategoriaPage;
