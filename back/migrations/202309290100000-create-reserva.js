"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reservas", {
      res_envio: {
        type: Sequelize.BOOLEAN,
      },

     id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      cli_dni1: {
        type: Sequelize.STRING(8),
        references: {
          model: "Clientes",
          key: "cli_dni",
        },
      },
      eve_id1: {
        type: Sequelize.INTEGER,
        references: {
          model: "Eventos",
          key: "id",
        },
      },
      syp_id1: {
        type: Sequelize.INTEGER,
        references: {
          model: "Serviciosyproductos",
          key: "id"
        },
      },
      res_monto: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reservas");
  },
};
