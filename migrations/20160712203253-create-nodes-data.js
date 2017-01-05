'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('nodes_data', {
      node_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      last_transmission: {
        allowNull: false,
        type: Sequelize.STRING
      },
      packets_sent: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      packets_received: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('nodes_data');
  }
};
