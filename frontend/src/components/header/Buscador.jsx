import "./header.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Buscador = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [texto, setTexto] = useState("");

  useEffect(() => {
    setTexto(searchParams.get("buscar") || "");
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const valor = texto.trim();

    if (!valor) {
      navigate("/");
      return;
    }

    navigate(`/?buscar=${encodeURIComponent(valor)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="form-buscador">
      <input
        className="buscador"
        type="text"
        placeholder="Buscar juegos..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
    </form>
  );
};

export default Buscador;
