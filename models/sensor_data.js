'use strict';
module.exports = function(sequelize, DataTypes) {
  var sensor_data = sequelize.define('sensor_data', {
    ts: DataTypes.DATE,
    pid: DataTypes.INTEGER,
    src: DataTypes.STRING,
    tid: DataTypes.STRING,
    sdata: DataTypes.INTEGER
  }, {
    timestamp: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sensor_data;
};