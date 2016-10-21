'use strict';
module.exports = function(sequelize, DataTypes) {
  var sensor_type = sequelize.define('sensor_type', {
    type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sensor_type;
};