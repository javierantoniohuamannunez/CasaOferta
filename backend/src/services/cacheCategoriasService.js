const { CategoriaHome } = require("../models");
const { obtenerCategorias } = require("./rawgService");

const actualizarCategorias = async () => {
  try {
    const categorias = await obtenerCategorias();

    const categoriasFormateadas = categorias
      .filter(
        (categoria) =>
          categoria?.name && categoria?.slug && categoria?.image_background,
      )
      .map((categoria) => ({
        nombre: categoria.name,
        slug: categoria.slug,
        imagen: categoria.image_background,
      }));

    await CategoriaHome.destroy({
      where: {},
      truncate: true,
    });

    if (categoriasFormateadas.length > 0) {
      await CategoriaHome.bulkCreate(categoriasFormateadas);
    }

    console.log("Categorias actualizadas");
  } catch (error) {
    console.log("Error actualizando categorias:", error.message);
  }
};

module.exports = {
  actualizarCategorias,
};
