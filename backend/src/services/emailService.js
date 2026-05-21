const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,
  },
});

const enviarCorreoOferta = async (
  email,
  juego,
  precioActual,
  precioBase,
  url,
) => {
  try {
    await transporter.sendMail({
      from: `"CazaOfertas" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: `El juego ${juego} está en oferta`,

      html: `
          <div style="
            font-family: Arial;
            padding: 20px;
            background: #111827;
            color: white;
          ">
            <h2>
             Oferta encontrada
            </h2>

            <p>
              <strong>${juego}</strong>
              bajó de precio.
            </p>

            <p>
              Precio actual:
              <strong>
                ${precioActual}€
              </strong>
            </p>

            <p>
              Precio base:
              <strong>
                ${precioBase}€
              </strong>
            </p>

            <a
              href="${url}"
              style="
                display:inline-block;
                margin-top:20px;
                padding:12px 20px;
                background:#ff7b00;
                color:white;
                text-decoration:none;
                border-radius:10px;">
              Ver oferta
            </a>
          </div>
        `,
    });

    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.log("Error enviando correo:", error.message);
  }
};

module.exports = {
  enviarCorreoOferta,
};
