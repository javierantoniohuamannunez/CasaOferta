import "./perfil.css";
const Perfil = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="perfil-page">
      <div className="perfil-card">
        <div className="perfil-avatar">
          👤
        </div>

        <h1>Mi Perfil</h1>

        <p className="perfil-email">
          Usuario logeado
        </p>

        <div className="perfil-info">
          <div className="perfil-box">
            <span>Estado</span>
            <strong>
              {token ? "Conectado" : "Desconectado"}
            </strong>
          </div>

          <div className="perfil-box">
            <span>Favoritos</span>
            <strong>0 juegos</strong>
          </div>
        </div>
      </div>

      <div className="favoritos-section">
        <h2>❤️ Juegos Favoritos</h2>

        <div className="favoritos-vacio">
          No tienes favoritos todavía
        </div>
      </div>
    </div>
  );
};

export default Perfil;