const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }
  Cliente.init({
    cli_dni: {
      type: DataTypes.STRING(8),
      primaryKey: true, // Indica que cli_dni es la clave primaria
      allowNull: false,
      unique: true,
    },
    cli_personahumana: DataTypes.BOOLEAN,
    cli_nombre: DataTypes.STRING,
    cli_email: DataTypes.STRING,
    cli_celular: DataTypes.STRING,
    cli_empresa: DataTypes.STRING,
    cli_password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cliente',
    timestamps: false,
    autoIncrement: false,
  });
  return Cliente;
};
