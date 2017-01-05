'use strict';
module.exports = function(sequelize, DataTypes) {
  var SensorData= sequelize.define('sensor_data', {
    node_id: {
      type: DataTypes.INTEGER
    },
    sensor_type_id: {
      type: DataTypes.INTEGER
    },
    value: {
      type: DataTypes.DOUBLE
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SensorData;
};
