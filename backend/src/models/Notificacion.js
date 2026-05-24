const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Notificacion = sequelize.define("Notificacion", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
  },
  juegoId: {
    type: DataTypes.STRING,
  },
  titulo: {
    type: DataTypes.STRING,
  },
  mensaje: {
    type: DataTypes.TEXT,
  },
  imagen: {
    type: DataTypes.TEXT,
  },
  leida: {
    type: DataTypes.BOOLEAN,

    defaultValue: false,
  },
});

module.exports = Notificacion;
