'use strict';
module.exports = function(sequelize, DataTypes) {
  var sensor_data_archive = sequelize.define('sensor_data_archive', {
    node_id: DataTypes.INTEGER,
    sensor_type_id: DataTypes.INTEGER,
    value: DataTypes.DOUBLE,
    date_created_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sensor_data_archive;
};