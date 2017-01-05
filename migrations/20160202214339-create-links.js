'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.createTable('links', {
      source_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      target_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      traffic_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    return queryInterface.addIndex('links', ['source_id', 'target_id']);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('links');
  }
};
