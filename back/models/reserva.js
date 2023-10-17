'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      Reserva.belongsToMany(models.Serviciosyproductos, { through: "ReservaServicio", foreignKey: 'reservaId',
      otherKey: 'servicioProductoId' }); 
    }
  }
  Reserva.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      res_envio: DataTypes.BOOLEAN,
      res_monto: DataTypes.DOUBLE,
      cli_dni1: {
        type: DataTypes.STRING,
        references: {
          model: "Clientes",
          key: "cli_dni",
        },
      },
      eve_id1: {
        type: DataTypes.INTEGER,
        references: {
          model: "Eventos",
          key: "id",
        },
      },
      
    },
    {
      sequelize,
      modelName: "Reserva",
    }
  );
  return Reserva;
};
