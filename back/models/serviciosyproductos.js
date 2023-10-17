'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Serviciosyproductos extends Model {
    static associate(models) {
      Serviciosyproductos.belongsToMany(models.Reserva, {
        through: 'ReservaServicio',
        foreignKey: 'servicioProductoId',
        otherKey: 'reservaId'
      });
    }
  }
  Serviciosyproductos.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    syp_nombre: {
      type: DataTypes.STRING,
    },
    syp_url: {
      type: DataTypes.STRING,
    },
    syp_descripcion: {
      type: DataTypes.STRING,
    },
    syp_categoriaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categoria',
        key: 'id',
      },
    },
    syp_precio: {
      type: DataTypes.FLOAT,
    },
  }, {
    sequelize,
    modelName: 'Serviciosyproductos',
    timestamps: false,
  });
  return Serviciosyproductos;
};
