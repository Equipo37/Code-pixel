const db = require('../models');

async function getAll() {
  try {
    const syp = await db.Serviciosyproductos.findAll();
    return syp;
  } catch (error) {
    throw new Error('Error al obtener los productos');
  }
}

async function add(nombre, categoriaId) {
  try {
    const syp = new db.Serviciosyproductos();
    syp.syp_nombre = nombre;
    syp.syp_categoriaId = categoriaId;
    const sypCreated = await syp.save();
    return sypCreated;
  } catch (error) {
    throw new Error('Error al crear el producto/servicio');
  }
}

async function getById(id) {
  try {
    const syp = await db.Serviciosyproductos.findByPk(id);
    if (!syp) {
      throw new Error('Producto/servicio no encontrado');
    }
    return syp;
  } catch (error) {
    throw new Error('Error al obtener el producto/servicio');
  }
}

async function getByCategoriaId(categoriaId) {
  try {
    const syp = await db.Serviciosyproductos.findAll({
      where: {
        syp_categoriaId: categoriaId,
      },
    });
    return syp;
  } catch (error) {
    throw new Error('Error al obtener los productos/servicios');
  }
}

async function edit(id, nombre, categoriaId) {
  try {
    const syp = await getById(id);
    if (nombre) syp.syp_nombre = nombre;
    if (categoriaId) syp.syp_categoriaId = categoriaId;
    const sypEdited = await syp.save();
    return sypEdited;
  } catch (error) {
    throw new Error('Error al editar el producto');
  }
}

async function deleteProductoServicio(id) {
  const syp = await getById(id);
  await syp.destroy();
}

module.exports = {
  getAll, add, getById, edit, deleteProductoServicio, getByCategoriaId,
};
