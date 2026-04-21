import { useState } from "react";
const Buscador = ({ onBuscar }) => {
  const [texto, setTexto] = useState("");

  //  const handleChange = (e) => {
  //   const valor = e.target.value;
  //   setTexto(valor);
  //   onBuscar(valor);
  // };

  // return (
  //   <input
  //     className="buscador"
  //     type="text"
  //     placeholder="🔍 Buscar juegos..."
  //     value={texto}
  //     onChange={handleChange}
  //   />
  // );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (texto.trim() === "") return; //evitar que el texto vacio

    onBuscar(texto);
  };

  return (
    <form onSubmit={handleSubmit} className="form-buscador">
      <input
        className="buscador"
        type="text"
        placeholder=""
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
    </form>
  );
};

export default Buscador;
