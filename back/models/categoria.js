const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {

  }
  Categoria.init({
    cat_nombre: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Categoria',
    timestamps: false,

  });
  return Categoria;
};
