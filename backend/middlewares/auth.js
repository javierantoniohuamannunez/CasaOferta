const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "No autorizado",
    });
  }

  try {

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      "secreto123"
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      error: "Token inválido",
    });
  }
};

module.exports = verificarToken;