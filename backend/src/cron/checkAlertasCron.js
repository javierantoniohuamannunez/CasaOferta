const cron = require("node-cron");

const { Alerta, Usuario, OfertaTienda } = require("../models");

const { enviarCorreoOferta } = require("../services/emailService");

// revisar cada hora
cron.schedule("0 * * * *", async () => {
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
          nombre: alerta.nombreJuego,
        },
        order: [["precioActual", "ASC"]],
      });
      if (!oferta) {
        continue;
      }

      // si tiene descuento
      if (oferta.precioActual < alerta.precioBase) {
        await enviarCorreoOferta(
          alerta.Usuario.email,
          alerta.nombreJuego,
          oferta.precioActual,
          alerta.precioBase,
          oferta.url,
        );

        // actualizar precio base
        alerta.precioBase = oferta.precioActual;
        await alerta.save();
        console.log(`Correo enviado ${alerta.nombreJuego}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
