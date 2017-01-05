'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('nodes_position', {
      node_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      x_coordinate: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      y_coordinate: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('nodes_position');
  }
};
