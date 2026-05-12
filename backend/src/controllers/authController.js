const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

//register
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existe = await Usuario.findOne({
      where: {
        email: email,
      },
    });
    if (existe) {
      return res.status(400).json({
        ok: false,
        error: "El usuario ya existe",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({
      email,
      password: hash,
    });

    res.json({
      id: usuario.id,
      email: usuario.email,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({
      where: {
        email: email,
      },
    });
    if (!usuario) {
      return res.staturs(400).json({
        error: "El usuario no existe",
      });
    }
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(400).json({
        error: "Contraseña incorrecta",
      });
    }
    const token = jwt.sign(
      { id: usuario.id, 
        email: usuario.email },
      "secreto123",
      { expiresIn: "7d" },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { register, login };
