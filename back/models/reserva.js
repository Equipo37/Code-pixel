"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reserva.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
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
      syp_id1: {
        type: DataTypes.INTEGER,
        references: {
          model: "Serviciosyproductos",
          key: "id"
        }
      }
    },
    {
      sequelize,
      modelName: "Reserva",
    }
  );
  return Reserva;
};
