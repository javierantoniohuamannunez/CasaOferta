const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Alerta = sequelize.define("Alerta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  juegoId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombreJuego: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precioObjetivo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  activa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Alerta;
