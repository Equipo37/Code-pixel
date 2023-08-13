const clienteServices = require('../services/clientes-services');

async function getAllClientes(req, res) {
  try {
    const clientes = await clienteServices.getAll();
    res.status(200).send(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function signUpCliente(req, res) {
  const {
    dni, personahumana, nombre, email, celular, empresa, password
  } = req.body;
  try {
    const response = await clienteServices.singUp(
      dni,
      personahumana,
      nombre,
      email,
      celular,
      empresa,
      password
    );
    res.status(201).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getByDniCliente(req, res) {
  const { dni } = req.params;
  try {
    const response = await clienteServices.getByDni(dni);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: 'Cliente no encontrado' });
  }
}

async function editCliente(req, res) {
  const {
    dni, personahumana, nombre, email, celular, empresa, password
  } = req.body;
  try {
    const response = await clienteServices.edit(
      dni,
      personahumana,
      nombre,
      email,
      celular,
      empresa,
      password
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteCliente(req, res) {
  const { dni } = req.params;
  try {
    await clienteServices.deleteCliente(dni);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Cliente no encontrado' });
  }
}

async function login (req, res, next) {
  const {email, password} = req.body
  try {
    const response = await clienteServices.login(email, password)
    res.status(200).send(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllClientes,
  signUpCliente,
  getByDniCliente,
  editCliente,
  deleteCliente,
  login
};
