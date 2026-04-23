const categorias = [
  {
    nombre: "Terror",
    imagen:
      "https://store.fastly.steamstatic.com/categories/homepageimage/category/horror?cc=us&l=spanish&v=2",
  },
  {
    nombre: "Aventura",
    imagen:
      "https://store.fastly.steamstatic.com/categories/homepageimage/category/adventure?cc=us&l=spanish&v=2",
  },
  {
    nombre: "Cooperativo",
    imagen:
      "https://store.fastly.steamstatic.com/categories/homepageimage/category/multiplayer_coop?cc=us&l=spanish&v=2",
  },
  {
    nombre: "Ciencia Ficción ",
    imagen:
      "https://store.fastly.steamstatic.com/categories/homepageimage/category/science_fiction?cc=us&l=spanish&v=2",
  },
  {
    nombre: "Mundo Abierto",
    imagen:
      "https://store.fastly.steamstatic.com/categories/homepageimage/category/horror?cc=us&l=spanish&v=2",
  },
];
const Categorias = () => {
  return (
    <div className="categorias-container">
      <h2 className="titulo-seccion">Categorías</h2>

      <div className="categorias">
        {categorias.map((cat) => (
          <div className="categoria-card" key={cat.nombre}>
            <img src={cat.imagen} alt={cat.nombre} />
            <div className="overlay">{cat.nombre}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
