import { useState } from "react";
import { buscarJuegos } from "../services/api";
import Buscador from "../components/Buscador";
import TarjetaJuego from "../components/TarjetaJuego";
import Destacados from "../components/Destacados";
import Ofertas from "../components/Ofertas";
import Categorias from "../components/Categorias";
import ListaOfertas from "../components/ListaOfertas";
import JuegosBaratos from "../components/JuegosBaratos";
const Home = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [buscando, setBuscando] = useState(false);

  const handleBuscar = async (texto) => {
    if (!texto) {
      setBuscando(false);
      return;
    }

    setBuscando(true);
    setCargando(true);

    try {
      const data = await buscarJuegos(texto);
      setJuegos(data);
    } catch (error) {
      console.log("ERROR:", error);
    }

    setCargando(false);
  };

  return (
    <div className="container">

      <div className="header">
        <div className="logo">CasaOferta</div>
        <Buscador onBuscar={handleBuscar} />
      </div>

      {buscando ? (
        <>
          {cargando && <p>Buscando juegos...</p>}

          {!cargando && juegos.length === 0 && (
            <p>No hay resultados</p>
          )}

          <div className="grid">
            {juegos.map((juego) => (
              <TarjetaJuego key={juego.id} juego={juego} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Juegos Destacados</h2>
          <Destacados />

          <h2>Ofertas</h2>
          <Ofertas />

          <h2>Explorar por Categorías</h2>
          <Categorias />

          <h2>Juegos por menos de 10€</h2>
          <JuegosBaratos />
        </>
      )}

    </div>
  );
};

export default Home;