import { useEffect, useState } from "react";

const Ofertas = () => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await fetch("http://localhost:3000/ofertas?buscar=game");
    const data = await res.json();

    const ordenadas = data.sort(
      (a, b) => b.savings - a.savings
    );

    setOfertas(ordenadas.slice(0, 6)); // muestra 6
  };

  return (
    <div className="ofertas">
      {ofertas.map((oferta) => (
        <div className="oferta-card" key={oferta.dealID}>
          <img src={oferta.thumb} alt={oferta.title} />

          <div className="oferta-info">
            <p>{oferta.title}</p>

            <div className="precio">
              <span className="descuento">
                -{Math.round(oferta.savings)}%
              </span>

              <span className="precio-final">
                {oferta.salePrice}€
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ofertas;