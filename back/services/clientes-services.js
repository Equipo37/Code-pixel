const db = require('../models');
const jwt = require('jsonwebtoken');
async function getAll() {
  try {
    const clientes = await db.Cliente.findAll();
    return clientes;
  } catch (error) {
    throw new Error('Error al obtener los clientes');
  }
}

async function singUp(dni, personahumana, nombre, email, celular, empresa, password) {
  
  try {
    const cliente = new db.Cliente();
    cliente.cli_dni = dni;
    cliente.cli_personahumana = personahumana;
    cliente.cli_nombre = nombre;
    cliente.cli_email = email;
    cliente.cli_celular = celular;
    cliente.cli_empresa = empresa;
    cliente.cli_password = password
    const clienteCreated = await cliente.save();
    return "cliente creado con éxito";
  } catch (error) {
    throw new Error('Error al crear el cliente');
  }
}

async function login (email, password) {
  const cliente = await db.Cliente.findOne({
    where: {
      cli_email: email,
      cli_password: password
    }
  })
  if (!cliente) {
    throw new NotFound ("Cliente no encontrado")
  }
  const token = jwt.sign({
    dni: cliente.dataValues.cli_dni,
  }, 'ClaveUltraSecreta')
  return {accessToken: token}
}

async function getByDni(dni) {
  try {
    const cliente = await db.Cliente.findByPk(dni);
    if (!cliente) {
      return "Cliente no encontrado"
    } 
    return cliente;
  } catch (error) {
    throw new Error('Error al obtener el cliente');
  }
}

async function edit(dni, personahumana, nombre, email, celular, empresa, password) {
  try {
    const cliente = await getByDni(dni);
    if (personahumana) cliente.cli_personahumana = personahumana;
    if (nombre) cliente.cli_nombre = nombre;
    if (email) cliente.cli_email = email;
    if (celular) cliente.celular = celular;
    if (empresa) cliente.cli_empresa = empresa;
    if (password) cliente.cli_password = password;
    const clienteEdited = await cliente.save();
    return clienteEdited;
  } catch (error) {
    throw new Error('Error al editar el cliente');
  }
}

async function deleteCliente(dni) {
  const cliente = await getByDni(dni);
  await cliente.destroy();
}

module.exports = {
  getAll, singUp, getByDni, edit, deleteCliente, login
};
