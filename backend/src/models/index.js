const Usuario = require("./Usuario");
const Favorito = require("./Favorito");
const OfertaHome = require("./OfertaHome");
const OfertaTienda = require("./OfertaTienda");
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
  OfertaTienda
};