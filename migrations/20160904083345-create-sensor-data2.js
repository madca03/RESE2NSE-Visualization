'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('sensor_data2', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ts: {
        allowNull: false,
        type: Sequelize.DATE
      },
      pid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      src: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sdata: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('sensor_data2');
  }
};
