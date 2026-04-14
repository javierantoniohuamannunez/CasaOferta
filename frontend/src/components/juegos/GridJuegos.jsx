import TarjetaJuego from "./TarjetaJuego";
const GridJuegos = ({ juegos }) => {
  return (
    <div className="grid">
      {juegos.map((juego) => (
        <TarjetaJuego key={juego.id} juego={juego} />
      ))}
    </div>
  );
};
export default GridJuegos;
