const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Alerta = sequelize.define(
  "Alerta",
  {
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
    nombreJuego: {
      type: DataTypes.STRING,
    },
    ultimoPrecio: {
      type: DataTypes.FLOAT,
    },
    activa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
);

module.exports = Alerta;