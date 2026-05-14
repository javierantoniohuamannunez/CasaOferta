import { useState } from "react";
import MejoresJuegos from "../components/hero/MejoresJuegos";
// import Header from "../components/header/Header";
import Resultados from "../components/resultados/Resultados";
import ResultadosGenero from "../components/resultados/ResultadosGenero";
import MejoresOfertas from "../components/ofertas/Ofertas";
import Categorias from "../components/categorias/Categorias";
const Home = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  return (
    <div>
      {/* <Header onBuscar={setBusqueda} /> */}
      {categoriaSeleccionada ? (
        <ResultadosGenero categoria={categoriaSeleccionada} />
      ) : busqueda === "" ? (
        <>
          <Categorias onCategoriaClick={setCategoriaSeleccionada} />
          <MejoresOfertas />
          <MejoresJuegos />
        </>
      ) : (
        <Resultados busqueda={busqueda} />
      )}
    </div>
  );
};
export default Home;
