const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Serviciosyproductos extends Model {

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
      type: DataTypes.STRING
    },
    syp_categoriaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categoria',
        key: 'id',
      },
      syp_precio: {
        type: DataTypes.FLOAT,
      }
    },
  }, {
    sequelize,
    modelName: 'Serviciosyproductos',
    timestamps: false,
  });
  return Serviciosyproductos;
};
