const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Favorito = sequelize.define("Favorito", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: DataTypes.STRING,
  imagen: DataTypes.STRING,
  juegoId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
});
module.exports = Favorito;
