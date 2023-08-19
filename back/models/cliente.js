const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
  }
  Cliente.init({
    cli_dni: {
      type: DataTypes.STRING(8),
      primaryKey: true, 
      allowNull: false,
      unique: true,
    },
    cli_personahumana: DataTypes.BOOLEAN,
    cli_nombre: DataTypes.STRING,
    cli_email: DataTypes.STRING,
    cli_celular: DataTypes.STRING,
    cli_admin: DataTypes.BOOLEAN,
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
