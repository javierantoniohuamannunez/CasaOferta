const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const JuegoDestacado = sequelize.define(
  "JuegoDestacado",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    juegoId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    metacritic: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    plataformas: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "JuegosDestacados",
    timestamps: true,
  }
);

module.exports = JuegoDestacado;