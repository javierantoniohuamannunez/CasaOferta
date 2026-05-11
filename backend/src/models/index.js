const Usuario = require("./Usuario");
const Favorito = require("./Favorito");

Usuario.hasMany(Favorito, { foreignKey: "usuarioId" });
Favorito.belongsTo(Usuario, { foreignKey: "usuarioId" });

module.exports = {
  Usuario,
  Favorito,
};