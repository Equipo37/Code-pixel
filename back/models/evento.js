'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Evento.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    eve_fechainicio: {
      type: DataTypes.DATE
    },
    eve_fechafin: {
      type: DataTypes.DATE
    },
    eve_lugar: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Evento',
  });
  return Evento;
};