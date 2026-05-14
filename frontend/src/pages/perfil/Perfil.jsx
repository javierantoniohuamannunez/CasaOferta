import "./perfil.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerFavorito } from "../../services/favoritos";
const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();
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
        const data = await obtenerFavorito();
        console.log(data);
        setFavoritos(data);
      } catch (error) {
        console.log(error);
      }
    };

    cargarFavoritos();
  }, []);

  return (
    <div className="perfil-page">
      <button className="btn-volver" onClick={() => navigate(-1)}>
        ← Volver
      </button>
      <div className="perfil-card">
        <div className="perfil-avatar">👤</div>

        <h1>Mi Perfil</h1>

        <p className="perfil-email">{usuario?.email}</p>

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
          <div className="favoritos-vacio">No tienes favoritos todavía</div>
        ) : (
          <div className="favoritos-grid">
            {favoritos.map((juego) => (
              <Link
                to={`/juego/${juego.id}`}
                key={juego.id}
                className="favorito-card"
              >
                <img src={juego.imagen} alt={juego.nombre} />

                <h3>{juego.nombre}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
