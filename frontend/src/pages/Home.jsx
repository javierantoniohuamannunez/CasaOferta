import { React, useState } from "react";
import MejoresJuegos from "../components/home/MejoresJuegos";
import Header from "../components/home/Header";
import Resultados from "../components/home/Resultados";
import MejoresOfertas from "../components/home/Ofertas";
import Categorias from "../components/home/Categorias";
import ResultadosGenero from "../components/home/ResultadosGenero";
const Home = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  return (
    <div>
      <Header onBuscar={setBusqueda} />
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
