const { Sequelize } = require("sequelize");


const dbName = process.env.DB_NAME || "casaoferta";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "huaman2365";
const dbHost = process.env.DB_HOST || "mysql";
const dbDialect = process.env.DB_DIALECT || "mysql";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: false,
});

module.exports=sequelize;
