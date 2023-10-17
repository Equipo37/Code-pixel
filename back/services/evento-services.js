const db = require('../models');

async function getAll() {
  try {
    const eventos = await db.Evento.findAll();
    return eventos;
  } catch (error) {
    throw new Error('Error al obtener los eventos');
  }
}

async function add(fechainicio, fechafin, lugar) {
    try {
      const evento = new db.Evento();
      evento.eve_fechainicio = fechainicio;
      evento.eve_fechafin = fechafin;
      evento.eve_lugar = lugar;
      
      const eventoCreated = await evento.save();
      return eventoCreated
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear el Evento');
    }

  
}

async function getById(id) {
  try {
    const evento = await db.Evento.findByPk(id);
    if (!evento) {
      return "Evento no encontrado"
    } 
    return evento;
  } catch (error) {
    throw new Error('Error al obtener el evento');
  }
}

module.exports = {
  getAll, getById, add
};
