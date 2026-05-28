import "./notificaciones.css";

import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { obtenerNotificaciones, marcarLeida } from "../../services/notificaciones";

const NotificacionesBell = () => {
  const [open, setOpen] = useState(false);

  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  cargarNotificaciones();
}, []);

  const cargarNotificaciones = async () => {
    try {
      const data = await obtenerNotificaciones();

      setNotificaciones(data);
    } catch (error) {
      console.log(error);
    }
  };

  const unread = notificaciones.filter((n) => !n.leida).length;

  const handleLeida = async (id) => {
    try {
      await marcarLeida(id);

      setNotificaciones((prev) =>
        prev.map((n) =>
          n.id === id
            ? {
                ...n,
                leida: true,
              }
            : n,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notif-wrapper">
      <button className="notif-btn" onClick={() => setOpen(!open)}>
        <FaBell />

        {unread > 0 && <span className="notif-badge">{unread}</span>}
      </button>

      {open && (
        <div className="notif-dropdown">
          <h3>Notificaciones</h3>

          {notificaciones.length === 0 ? (
            <p>No tienes notificaciones</p>
          ) : (
            notificaciones.map((n) => (
              <div
                key={n.id}
                className={`notif-item ${n.leida ? "read" : ""}`}
                onClick={() => handleLeida(n.id)}
              >
                <img src={n.imagen} alt="" />

                <div>
                  <strong>{n.titulo}</strong>

                  <p>{n.mensaje}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificacionesBell;
