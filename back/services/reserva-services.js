const db = require('../models');

async function getAll() {
  try {
    const reservas = await db.Reserva.findAll();
    return reservas;
  } catch (error) {
    throw new Error('Error al obtener las reservas');
  }
}

async function add(cli_dni1, eve_id1, res_envio, syp_id1, res_monto ) {
    try {
      
      const reserva = new db.Reserva();
      reserva.cli_dni1 = cli_dni1;
      reserva.eve_id1 = eve_id1;
      reserva.res_envio = res_envio;
      reserva.res_monto = res_monto;
      const reservaCreated = await reserva.save();
      for (const servicioProductoId of syp_id1) {
        const reservaServicio = new db.ReservaServicio();
        reservaServicio.reservaId = reservaCreated.id;
        reservaServicio.servicioProductoId = servicioProductoId;
        await reservaServicio.save();
      }
      return reservaCreated
    } catch (error) {
      console.log(error)
      throw new Error('Error al crear la Reserva');
    }

  
}

async function getByDni(dni) {
  const products = []
  try {
    const reservas = await db.Reserva.findAll({ where: { cli_dni1: dni } });
    if (reservas?.length < 1) {
      return "Reservas no encontradas"
    } 
    const promises = reservas.map(async (reserva) => {
      const reservaServicios = await db.ReservaServicio.findAll({where: {reservaId: reserva.id}})
      const promises2 = reservaServicios.map(async (res) => {
        let product = await db.Serviciosyproductos.findByPk(res.servicioProductoId)
        return product
      })
      const products2 = await Promise.all(promises2);
      products.push(...products2);
      const evento = await db.Evento.findByPk(reserva.eve_id1);
      const reservaFinal = {
        reserva: { ...reserva.dataValues },
        products,
        evento: {...evento.dataValues}
      };
      return reservaFinal;
    });
    const reservasFinal = await Promise.all(promises);
    return reservasFinal;
  } catch (error) {
    console.log(error)
    throw new Error('Error al obtener las reservas');
  }
}

async function getById(id) {
    try {
      const reserva = await db.Reserva.findByPk(id);
      if (!reserva) {
        return "Reserva no encontrada"
      } 
      return reserva;
    } catch (error) {
      throw new Error('Error al obtener la reserva');
    }
  }


module.exports = {
  getAll, getById, add, getById, getByDni
};
