const eventoServices = require("../services/evento-services");

async function getAllEventos(req, res) {
  try {
    const eventos = await eventoServices.getAll();
    if (eventos?.length < 1) {
      res.status(404).json({ error: "Evento no encontrado" });
    } else {
      res.status(200).send(eventos);
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function addEvento(req, res) {
  const { fechainicio, fechafin, lugar } = req.body;
  if (!fechafin || !fechainicio || !lugar) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }
  try {
    const response = await eventoServices.add(fechafin, fechainicio, lugar);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getEventoById(req, res) {
  const { id } = req.params;

  try {
    const response = await eventoServices.getById(id);
    if (response == "Evento no encontrado") {
      res.status(404).json({ error: "Evento no encontrado" });
      return;
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



module.exports = {
  getAllEventos,
  getEventoById,
  addEvento
};
