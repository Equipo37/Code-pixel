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
  const { nombre, categoriaId, url } = req.body;
  if (!nombre || !categoriaId || !url) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }
  console.log(typeof categoriaId)
  if (typeof nombre !== "string" ||
      typeof categoriaId !== "number" ||
      typeof url !== "string"    
  ) {
    return res.status(400).json({ message: "Tipos de datos incorrectos" });
  }
  if (categoriaId > 4 || categoriaId < 0) {
    return res.status(400).json({ message: "El id de categoria debe ir entre 0 y 4" });

  }
  try {
    const response = await sypServices.add( nombre, categoriaId, url );
    res.status(201).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const response = await sypServices.getById(parseInt(id));
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: 'Producto/servicio no encontrado' });
  }
}

async function edit(req, res) {
  let { id } = req.params;
  id = parseInt(id)
  const { nombre, categoriaId, url } = req.body;
  if ((typeof id !== "number") ||
  (categoriaId && typeof categoriaId !== "number") ||
  (nombre && typeof nombre !== "string") || 
  (url && typeof url !== "string" )) {
    return res.status(400).json({ message: "Tipos de datos incorrectos" });
  }
  try {
    const response = await sypServices.edit(id, nombre, categoriaId, url);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getByCategoriaId(req, res) {
  const { id } = req.params;
  try {
    const response = await sypServices.getByCategoriaId(parseInt(id));
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: 'Productos/servicios no encontrados' });
  }
}
async function deleteProductoServicio(req, res) {
  const { id } = req.params;
  try {
    const response = await sypServices.deleteProductoServicio(parseInt(id));
    res.status(204).send(response);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
}

module.exports = {
  getAll, getById, edit, deleteProductoServicio, add, getByCategoriaId,
};
