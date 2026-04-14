import GridJuegos from "../components/juegos/GridJuegos";

const Home = () => {
  const juegosTest = [
    {
      id: 1,
      nombre: "GTA V",
      imagen: "https://picsum.photos/300/200?1",
      metacritic: 96,
      precio: 9.99,
      descuento: 80,
      tienda: "1",
    },
    {
      id: 2,
      nombre: "The Witcher 3",
      imagen: "https://picsum.photos/300/200?2",
      metacritic: 92,
      precio: 7.99,
      descuento: 70,
      tienda: "1",
    },
    {
      id: 3,
      nombre: "Cyberpunk 2077",
      imagen: "https://picsum.photos/300/200?3",
      metacritic: 86,
      precio: 14.99,
      descuento: 50,
      tienda: "25",
    },
    {
      id: 4,
      nombre: "Elden Ring",
      imagen: "https://picsum.photos/300/200?4",
      metacritic: 95,
      precio: 39.99,
      descuento: 20,
      tienda: "1",
    },
    
  ];

  return (
    <div className="container">
      <h2>Test Grid</h2>

      <GridJuegos juegos={juegosTest} />
    </div>
  );
};

export default Home;