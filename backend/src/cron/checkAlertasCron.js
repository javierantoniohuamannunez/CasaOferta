const cron = require("node-cron");

const { Alerta, Usuario, OfertaTienda, Notificacion } = require("../models");

const { enviarCorreoOferta } = require("../services/emailService");

cron.schedule("0 3 * * *", async () => {
  console.log("Revisando wishlist...");

  try {
    const alertas = await Alerta.findAll({
      where: {
        activa: true,
      },

      include: [
        {
          model: Usuario,
        },
      ],
    });

    for (const alerta of alertas) {
      // buscar oferta actual
      const oferta = await OfertaTienda.findOne({
        where: {
          juegoId: alerta.juegoId,
        },
        order: [["precioActual", "ASC"]],
      });

      if (!oferta) {
        continue;
      }

      // si bajo de precio y tiene descuento
      // if (oferta.precioActual < alerta.precioBase && oferta.descuento >= 10) {
      if(oferta){
        // enviar correo
        await enviarCorreoOferta(
          alerta.Usuario.email,
          alerta.nombreJuego,
          alerta.imagen,
          oferta.precioActual,
          alerta.precioBase,
          oferta.descuento,
          oferta.tienda,
          oferta.url,
        );
        // crear notificacion interna
        await Notificacion.create({
          usuarioId: alerta.usuarioId,
          juegoId: alerta.juegoId,
          titulo: "Juego en oferta",
          mensaje: `
              ${alerta.nombreJuego}
                ahora cuesta
              ${oferta.precioActual}€
              (-${oferta.descuento}%)
              `,
          imagen: alerta.imagen,
          leida: false,
        });
        console.log(`Correo enviado: ${alerta.nombreJuego}`);

        // actualizar precio basepara evitar spam
        alerta.precioBase = oferta.precioActual;

        await alerta.save();
      }
    }
  } catch (error) {
    console.log("Error cron alertas:", error.message);
  }
});
