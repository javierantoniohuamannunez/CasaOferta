import { useEffect, useState } from "react";
import { GridJuegos } from "../juegos/GridJuegos";

const MejoresOfertas=()=>{
    const[juegos,setJuegos]=useState([]);
    const[cargando,setCargando]=useState(true);
    useEffect(()=>{
            fetch("http://localhost:3000/ofertas")
            .then(res=>res.json())
            .then(data=>{
                  const juegosFormateados = data.map((j) => ({
          id: j.dealID,
          nombre: j.title,
          imagen: j.thumb,
          precio: j.salePrice,
          descuento: j.savings,
          tienda: j.storeID,
        }));
 setJuegos(juegosFormateados);
        setCargando(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setCargando(false);
      });
  }, []);  if (cargando) return <p>Cargando ofertas...</p>;

    return(
        <div className="mejores-ofertas">
            <h2>Mejores Ofertas</h2>
            <GridJuegos juegos={juegos} />
        </div>
    )
}
export default MejoresOfertas;