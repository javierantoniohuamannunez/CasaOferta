import { useState } from "react";
import MejoresJuegos from "../components/hero/MejoresJuegos";
// import Header from "../components/header/Header";
import Resultados from "../components/resultados/Resultados";
import ResultadosGenero from "../components/resultados/ResultadosGenero";
import MejoresOfertas from "../components/ofertas/Ofertas";
import Categorias from "../components/categorias/Categorias";
import PixelBackground from "../components/background/PixelBackground";
import "./home.css";
const Home = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  return (
  <div style={{ paddingTop: "130px" }}>
    <PixelBackground />

    {/* <Header onBuscar={setBusqueda} /> */}

    {categoriaSeleccionada ? (
      <ResultadosGenero categoria={categoriaSeleccionada} />
    ) : busqueda === "" ? (
      <>
        <section id="categorias">
          <Categorias
            onCategoriaClick={setCategoriaSeleccionada}
          />
        </section>

        <section id="ofertas">
          <MejoresOfertas />
        </section>

        <section id="destacados">
          <MejoresJuegos />
        </section>
      </>
    ) : (
      <Resultados busqueda={busqueda} />
    )}
  </div>
);
};

export default Home;
