import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DetalleJuego from "./pages/DetalleJuego";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/juego/:id" element={<DetalleJuego />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
