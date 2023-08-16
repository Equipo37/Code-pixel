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
  if (!dni || !nombre || !email || !celular || !password || !personahumana) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }
  if (
    typeof dni !== 'string' ||
    typeof personahumana !== 'boolean' ||
    typeof nombre !== 'string' ||
    typeof email !== 'string' ||
    typeof celular !== 'string' ||
    typeof empresa !== 'string' ||
    typeof password !== 'string'
  ) {
    return res.status(400).json({ message: "Tipos de datos incorrectos" });
  }
  let clienteRepetido = await clienteServices.getByDni(dni)
  if (clienteRepetido !== "Cliente no encontrado") {
    return res.status(409).json({ message: 'El ID ya existe en la base de datos' });
  }
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
    if (response == "Cliente no encontrado") {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function editCliente(req, res) {
  const {
    dni, personahumana, nombre, email, celular, empresa, password
  } = req.body;
  try {
    if ((dni && typeof dni !== "string") || 
    (personahumana && typeof personahumana !== "boolean") || 
    (nombre && typeof nombre !== "string") ||
    (email && typeof email !== "string") ||
    (celular && typeof celular !== "string") ||
    (empresa && typeof empresa !== "string") ||
    (password && typeof password !== "string")) {
      return res.status(400).json({ message: "Tipos de datos incorrectos" });
    }
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
