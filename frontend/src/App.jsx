import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "../src/pages/Home";
import DetalleJuego from "./pages/detallesJuegos/DetalleJuego";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Perfil from "./pages/perfil/Perfil";
import CategoriaPage from "./components/categorias/CategoriaPage";
import Tienda from "./pages/tiendas/Tienda";
function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/juego/:id" element={<DetalleJuego />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/categoria/:id" element={<CategoriaPage />} />
          <Route path="/tienda/:id" element={<Tienda />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
