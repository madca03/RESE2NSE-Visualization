'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('nodes_info', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mac_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      coordinate_set: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('nodes_info');
  }
};
