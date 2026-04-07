const { Sequelize } = require("sequelize");

const sequelize= new Sequelize('casaoferta','root','huaman2365',{
   host: 'localhost',
   dialect: 'mysql' 
});

module.exports=sequelize;