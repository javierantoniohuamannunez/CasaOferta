const Usuario = require("./Usuario");
const Favorito = require("./Favorito");
const OfertaHome = require("./ofertas_home");

Usuario.hasMany(Favorito, {
  foreignKey: "usuarioId",
});

Favorito.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});

module.exports = {
  Usuario,
  Favorito,
  OfertaHome,
};