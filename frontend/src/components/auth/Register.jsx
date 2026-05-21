import "./auth.css";
import { useState } from "react";
import { registerUser } from "../../services/auth";

import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(email, password);

      alert("Registrado con éxito");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(error.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Crear cuenta</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="email"
            placeholder="Correo electrónico"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Contraseña"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Registrarse"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?{" "}
          <Link className="auth-link" to="/login">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
