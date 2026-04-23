import { useEffect, useState } from "react";
import { obtenerCategorias } from "../../services/api";
const Categorias = ({ onCategoriaClick }) => {
  const [categorias, setCategorias] = useState([]);

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
            onClick={() => onCategoriaClick(cat)}
          >
            <img src={cat.imagen} alt={cat.nombre} />
            <div className="overlay">{cat.nombre}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;