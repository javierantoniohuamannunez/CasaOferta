const TarjetaJuego = ({ juego }) => {
  return (
    <div className="card">
      <img src={juego.background_image} alt={juego.name} />

      <div className="card-content">
        <h4>{juego.name}</h4>

        <div className="rating">
          ⭐ {juego.rating}
        </div>

        <button className="boton">
          Ver precio
        </button>
      </div>
    </div>
  );
};

export default TarjetaJuego;