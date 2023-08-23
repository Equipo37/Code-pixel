const db = require('../models');

async function getAll() {
  try {
    const categorias = await db.Categoria.findAll();
    return categorias;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener las categorias');
  }
}

async function getById(id) {
  try {
    const categoria = await db.Categoria.findByPk(id);
    return categoria;
  } catch (error) {
    throw new Error('Error al obtener el cliente');
  }
}

module.exports = {
  getAll, getById,
};
