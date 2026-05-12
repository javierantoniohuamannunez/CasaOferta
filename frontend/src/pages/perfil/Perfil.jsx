import "./perfil.css";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import { obtenerFavoritos } from "../../services/auth";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const data = jwtDecode(token);

      setUsuario(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const cargarFavoritos = async () => {
      try {
        const data = await obtenerFavoritos();

        setFavoritos(data);
      } catch (error) {
        console.log(error);
      }
    };

    cargarFavoritos();
  }, []);

  return (
    <div className="perfil-page">
      <div className="perfil-card">
        <div className="perfil-avatar">
          👤
        </div>

        <h1>Mi Perfil</h1>

        <p className="perfil-email">
          {usuario?.email}
        </p>

        <div className="perfil-info">
          <div className="perfil-box">
            <span>Estado</span>
            <strong>Conectado</strong>
          </div>

          <div className="perfil-box">
            <span>Favoritos</span>
            <strong>{favoritos.length} juegos</strong>
          </div>
        </div>
      </div>

      <div className="favoritos-section">
        <h2>❤️ Juegos Favoritos</h2>

        {favoritos.length === 0 ? (
          <div className="favoritos-vacio">
            No tienes favoritos todavía
          </div>
        ) : (
          <div className="favoritos-grid">
            {favoritos.map((juego) => (
              <div
                key={juego.id}
                className="favorito-card"
              >
                <img
                  src={juego.imagen}
                  alt={juego.nombre}
                />

                <h3>{juego.nombre}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;