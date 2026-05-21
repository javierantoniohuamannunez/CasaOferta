import "./modalAlerta.css";

const ModalAlerta = ({
  abierto,
  cerrar,
  precioObjetivo,
  setPrecioObjetivo,
  guardar,
}) => {
  if (!abierto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-alerta">
        <h2>Crear alerta</h2>

        <p>Introduce el precio deseado</p>

        <input
          type="number"
          placeholder="Ej: 19.99"
          value={precioObjetivo}
          onChange={(e) => setPrecioObjetivo(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn-cancelar" onClick={cerrar}>
            Cancelar
          </button>

          <button className="btn-guardar" onClick={guardar}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlerta;
