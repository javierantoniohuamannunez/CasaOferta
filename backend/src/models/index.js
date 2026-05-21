const Usuario = require("./Usuario");
const Favorito = require("./Favorito");
const OfertaHome = require("./OfertaHome");
const OfertaTienda = require("./OfertaTienda");
const Alerta= require("./Alerta");
Usuario.hasMany(Favorito, {
  foreignKey: "usuarioId",
});

Favorito.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});
Usuario.hasMany(Alerta, {
  foreignKey: "usuarioId",
});
Alerta.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});
module.exports = {
  Usuario,
  Favorito,
  OfertaHome,
  OfertaTienda,
  Alerta
};