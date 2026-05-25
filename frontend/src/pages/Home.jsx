import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MejoresJuegos from "../components/hero/MejoresJuegos";
import Resultados from "../components/resultados/Resultados";
import MejoresOfertas from "../components/ofertas/Ofertas";
import Categorias from "../components/categorias/Categorias";
import PixelBackground from "../components/background/PixelBackground";
import "./home.css";

const Home = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const busqueda = (searchParams.get("buscar") || "").trim();

  useEffect(() => {
    if (!location.hash || busqueda) {
      return;
    }

    const sectionId = location.hash.replace("#", "");

    requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }, [location.hash, busqueda]);

  return (
    <div style={{ paddingTop: "130px" }}>
      <PixelBackground />

      {busqueda === "" ? (
        <>
          <section id="categorias">
            <Categorias />
          </section>

          <section id="tiendas">
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
