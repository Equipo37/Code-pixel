'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Serviciosyproductos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      syp_nombre: {
        type: Sequelize.STRING
      },
      syp_url: {
        type: Sequelize.STRING
      },
      syp_precio: {
        type: Sequelize.FLOAT
      },
      syp_categoriaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categoria', 
          key: 'id' 
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Serviciosyproductos');
  }
};