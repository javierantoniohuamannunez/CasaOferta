const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OfertaHome = sequelize.define("OfertaHome", {
  juegoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.TEXT,
  },
  tiendaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tienda: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precioActual: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  precioNormal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descuento: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  metacritic: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  score: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  url: {
    type: DataTypes.TEXT,
  },
});
module.exports = OfertaHome;
