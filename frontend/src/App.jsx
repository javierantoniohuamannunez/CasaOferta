import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../src/pages/Home";
import DetalleJuego from "./pages/detallesJuegos/DetalleJuego";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Perfil from "./pages/perfil/Perfil";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/juego/:id" element={<DetalleJuego />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
