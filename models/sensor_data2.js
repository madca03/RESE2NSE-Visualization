'use strict';
module.exports = function(sequelize, DataTypes) {
  var sensor_data2 = sequelize.define('sensor_data2', {
    ts: DataTypes.DATE,
    pid: DataTypes.INTEGER,
    src: DataTypes.STRING,
    tid: DataTypes.STRING,
    sdata: DataTypes.INTEGER,
    node_id: DataTypes.INTEGER,
    sensor_type_id: DataTypes.INTEGER,
    value: DataTypes.DOUBLE
  }, {
    timestamp: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sensor_data2;
};
