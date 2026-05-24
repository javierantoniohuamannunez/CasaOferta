const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const OfertaTienda = sequelize.define(
  "OfertaTienda",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    juegoId: {
      type: DataTypes.STRING,
    },
    tiendaId: {
      type: DataTypes.INTEGER,
    },
    tienda: {
      type: DataTypes.STRING,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.TEXT,
    },
    precioActual: {
      type: DataTypes.FLOAT,
    },
    precioNormal: {
      type: DataTypes.FLOAT,
    },
    descuento: {
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.FLOAT,
    },
  },
);

module.exports = OfertaTienda;