import { useEffect, useState } from "react";

const ListaOfertas = () => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await fetch("http://localhost:3000/ofertas?buscar=game");
    const data = await res.json();
    setOfertas(data);
  };

  return (
    <div className="grid">
      {ofertas.map((oferta) => (
        <div className="card" key={oferta.dealID}>
          <img src={oferta.thumb} alt={oferta.title} />

          <div className="card-content">
            <h4>{oferta.title}</h4>

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

export default ListaOfertas;