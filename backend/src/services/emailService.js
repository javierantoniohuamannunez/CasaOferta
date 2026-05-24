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
  imagen,
  precioActual,
  precioBase,
  descuento,
  tienda,
  url,
) => {
  try {
    await transporter.sendMail({
      from: `"CazaOfertas" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: `🔥 ${juego} está en oferta`,

      html: `
<div style="
  background:#0f172a;
  padding:40px;
  font-family:Arial,sans-serif;
  color:white;
">

  <div style="
    max-width:650px;
    margin:auto;
    background:#111827;
    border-radius:20px;
    overflow:hidden;
    border:1px solid rgba(255,255,255,0.08);
  ">

    <!-- HEADER -->

    <div style="
      background:linear-gradient(135deg,#ff7b00,#ff5400);
      padding:25px;
      text-align:center;
    ">
      <h1 style="
        margin:0;
        font-size:32px;
        color:white;
      ">
        🎮 CazaOfertas
      </h1>

      <p style="
        margin-top:10px;
        color:white;
        opacity:0.9;
      ">
        Tu juego deseado está en oferta
      </p>
    </div>

    <!-- IMAGEN -->

    <img
      src="${imagen}"
      alt="${juego}"
      style="
        width:100%;
        height:280px;
        object-fit:cover;
      "
    />

    <!-- CONTENIDO -->

    <div style="padding:30px;">

      <h2 style="
        margin-top:0;
        font-size:28px;
      ">
        ${juego}
      </h2>

      <div style="
        background:#1e293b;
        border-radius:16px;
        padding:20px;
        margin-top:20px;
      ">

        <p style="margin:0 0 12px 0;">
          🏪 Tienda:
          <strong>${tienda}</strong>
        </p>

        <p style="margin:0 0 12px 0;">
          💸 Precio actual:
          <strong style="
            color:#4ade80;
            font-size:24px;
          ">
            ${precioActual}€
          </strong>
        </p>

        <p style="margin:0 0 12px 0;">
          🏷 Precio anterior:
          <span style="
            text-decoration:line-through;
            color:#94a3b8;
          ">
            ${precioBase}€
          </span>
        </p>

        <p style="margin:0;">
          🔥 Descuento:
          <strong style="
            color:#f97316;
            font-size:22px;
          ">
            -${descuento}%
          </strong>
        </p>
      </div>

      <!-- BOTON -->

      <div style="
        text-align:center;
        margin-top:35px;
      ">
        <a
          href="${url}"
          style="
            display:inline-block;
            background:#ff7b00;
            color:white;
            padding:16px 30px;
            border-radius:14px;
            text-decoration:none;
            font-weight:bold;
            font-size:18px;
          "
        >
          Ver oferta
        </a>
      </div>

    </div>

    <!-- FOOTER -->

    <div style="
      padding:20px;
      text-align:center;
      background:#0b1220;
      color:#94a3b8;
      font-size:13px;
    ">
      Recibiste este correo porque agregaste
      este juego a tu lista de deseo
      en CazaOfertas.
    </div>

  </div>
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
