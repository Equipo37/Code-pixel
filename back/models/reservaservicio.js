'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReservaServicio extends Model {
    static associate(models) {
     
    }
  }
  ReservaServicio.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    reservaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reserva', 
        key: 'id',
      },
    },
    servicioProductoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Serviciosyproductos',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'ReservaServicio',
  });
  return ReservaServicio;
};
