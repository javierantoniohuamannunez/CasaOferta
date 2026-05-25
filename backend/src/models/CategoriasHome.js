const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CategoriaHome = sequelize.define(
  "CategoriaHome",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "CategoriasHome",
    timestamps: true,
  }
);

module.exports = CategoriaHome;