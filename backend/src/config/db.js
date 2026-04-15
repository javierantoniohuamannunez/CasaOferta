const { Sequelize } = require("sequelize");

// Nota (2026-04-15): sacar credenciales del código. Usa variables de entorno si
// existen (y mantiene fallback para no romper tu entorno actual).
const dbName = process.env.DB_NAME || "casaoferta";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "huaman2365";
const dbHost = process.env.DB_HOST || "localhost";
const dbDialect = process.env.DB_DIALECT || "mysql";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: false,
});

module.exports=sequelize;
