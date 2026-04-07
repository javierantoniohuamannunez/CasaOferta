module.exports = (request, response) => {
  response.status(404).json({ ok: false, error: "ruta no encontrada" });
};
