'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      cli_dni: {
        type: Sequelize.STRING(8),
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      cli_personahumana: {
        type: Sequelize.BOOLEAN,
      },
      cli_nombre: {
        type: Sequelize.STRING(150),
        allowNull: false

      },
      cli_email: {
        type: Sequelize.STRING(50),
        allowNull: false

      },    
      cli_celular: {
        type: Sequelize.STRING(50),
      },
      cli_empresa: {
        type: Sequelize.STRING(50),
      },
      cli_password: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clientes');
  },

};
