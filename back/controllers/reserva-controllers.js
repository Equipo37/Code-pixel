const reservaServices = require("../services/reserva-services");
const clienteServices = require("../services/clientes-services");
const eventoServices = require("../services/evento-services");
const sypServices = require('../services/serviciosyproductos-services');

async function getAllReservas(req, res) {
  try {
    const reservas = await reservaServices.getAll();
    if (reservas?.length < 1) {
      res.status(404).json({ error: "Reserva no encontrada" });
    } else {
      res.status(200).send(reservas);
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function addReserva(req, res) {
  const { cli_dni1, eve_id1, res_envio, syp_id1, res_monto,  } = req.body;
  if (!cli_dni1 || !eve_id1 || !res_envio || !res_monto || !syp_id1) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }
  const cliente = clienteServices.getByDni(cli_dni1)
  const evento = eventoServices.getById(eve_id1)
  const syp = sypServices.getById(syp_id1)

  if (!cliente || !evento || !syp) {
    return res.status(400).json({message: "No existe un cliente con ese dni"})
  }

  try {
    const response = await reservaServices.add(cli_dni1, eve_id1, res_envio,  syp_id1, res_monto);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getReservaByDni(req, res) {
  const { dni } = req.params;
  try {
    const response = await reservaServices.getByDni(dni);
    if (response == "Reservas no encontradas") {
      res.status(404).json({ error: "Reservas no encontradas" });
      return;
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getReservaById(req, res) {
    const { id } = req.params;
  
    try {
      const response = await reservaServices.getById(id);
      if (response == "Reserva no encontrada") {
        res.status(404).json({ error: "Reserva no encontrada" });
        return;
      }
      res.status(200).send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


module.exports = {
  getAllReservas,
  getReservaByDni,
  addReserva,
  getReservaById
};
