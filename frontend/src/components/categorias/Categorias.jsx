import "./categorias.css";
import { useEffect, useState } from "react";
import { obtenerCategorias } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (error) {
        console.log(error);
      }
    };

    cargar();
  }, []);

  return (
    <div className="categorias-container">
      <h2 className="titulo-seccion">Categorías</h2>

      <div className="categorias">
        {categorias.map((cat) => (
          <div
            className="categoria-card"
            key={cat.id}
            onClick={() => navigate(`/categoria/${cat.id}`)}
          >
            <img src={cat.imagen} alt={cat.nombre} />

            <div className="overlay">
              {cat.nombre}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;