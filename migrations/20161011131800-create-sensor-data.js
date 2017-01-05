'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('sensor_data', {
      node_id: {
        type: Sequelize.INTEGER
      },
      sensor_type_id: {
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.DOUBLE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('sensor_data');
  }
};
