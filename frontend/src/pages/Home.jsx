import {React, useState} from "react";
import MejoresJuegos from "../components/home/MejoresJuegos";
import Header from "../components/home/Header";
import Resultados from "../components/home/Resultados";
const Home = () => {
  const [busqueda, setBusqueda] = useState("");
  return (
    <div>
      <Header onBuscar={setBusqueda} />
      {busqueda === "" ? (
        <MejoresJuegos />
      ) : (
        <Resultados busqueda={busqueda} />
      )}
    </div>
  );
};
export default Home;
