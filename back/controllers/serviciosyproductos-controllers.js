const sypServices = require('../services/serviciosyproductos-services');

async function getAll(req, res) {
  try {
    const syp = await sypServices.getAll();
    res.status(200).send(syp);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function add(req, res) {
  const {
    nombre, categoriaId,
  } = req.body;
  try {
    const response = await sypServices.add(
      nombre,
      categoriaId,
    );
    res.status(201).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const response = await sypServices.getById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: 'Producto/servicio no encontrado' });
  }
}

async function edit(req, res) {
  const {
    id, nombre, categoriaId,
  } = req.body;
  try {
    const response = await sypServices.edit(
      id,
      nombre,
      categoriaId,
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getByCategoriaId(req, res) {
  const { id } = req.params;
  try {
    const response = await sypServices.getByCategoriaId(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: 'Productos/servicios no encontrados' });
  }
}
async function deleteProductoServicio(req, res) {
  const { id } = req.params;
  try {
    await sypServices.deleteProductoServicio(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
}

module.exports = {
  getAll, getById, edit, deleteProductoServicio, add, getByCategoriaId,
};
