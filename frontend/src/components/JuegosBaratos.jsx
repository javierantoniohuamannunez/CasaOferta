import { useEffect, useState } from "react";
import { buscarJuegos } from "../services/api";
import { obtenerNombreTienda } from "../utils/tiendas";

const JuegosBaratos = () => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await fetch("http://localhost:3000/ofertas?buscar=game");
    const data = await res.json();

    const tiendasTop = ["1", "25", "8", "13"]; // Steam, Epic, Origin, Uplay

    let filtrados = data.filter(
      (j) => parseFloat(j.salePrice) < 20
    );

    filtrados.sort((a, b) => {
      const aTop = tiendasTop.includes(a.storeID);
      const bTop = tiendasTop.includes(b.storeID);

      if (aTop && !bTop) return -1;
      if (!aTop && bTop) return 1;

      return b.savings - a.savings;
    });

    const resultadoFinal = [];
    const contadorTiendas = {};

    for (let i = 0; i < filtrados.length && resultadoFinal.length < 8; i++) {
      const juego = filtrados[i];
      const tienda = juego.storeID;

      // 🔥 limitar repetición de tiendas
      if (contadorTiendas[tienda] >= 8) continue;

      try {
        const resultadosRAWG = await buscarJuegos(juego.title);

        if (resultadosRAWG && resultadosRAWG.length > 0) {
          const juegoRAWG = resultadosRAWG[0];

          resultadoFinal.push({
            ...juego,
            rating: juegoRAWG.rating,
            imagen: juegoRAWG.background_image,
          });
        } else {
          // fallback si RAWG no encuentra nada
          resultadoFinal.push({
            ...juego,
            rating: null,
            imagen: juego.thumb,
          });
        }

        contadorTiendas[tienda] =
          (contadorTiendas[tienda] || 0) + 1;

      } catch (error) {
        console.log("Error RAWG", error);

        // fallback si falla API
        resultadoFinal.push({
          ...juego,
          rating: null,
          imagen: juego.thumb,
        });
      }
    }

    setJuegos(resultadoFinal);
  };

  return (
    <div className="grid">
      {juegos.map((juego) => (
        <div className="card" key={juego.dealID}>
          <img
            src={juego.imagen || juego.thumb}
            alt={juego.title}
          />

          <div className="card-content">
            <h4>{juego.title}</h4>

            <div className="info-extra">
              {juego.rating && (
                <span className="rating">
                  ⭐ {juego.rating}
                </span>
              )}

              <span className="tienda">
                🏪 {obtenerNombreTienda(juego.storeID)}
              </span>
            </div>

            <div className="precio">
              <span className="descuento">
                -{Math.round(juego.savings)}%
              </span>

              <span className="precio-final">
                {juego.salePrice}€
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JuegosBaratos;